import to from 'await-to-js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Router } from 'express'
import { Types } from 'mongoose'
import { User } from '../../store/models'
import auth from '../../middlewares/auth'

// TODO create enums for custom error codes
// TODO use validator (express-validator)

const userRouter = Router()

userRouter.get('/', auth, async (req, res) => {
  const { userId } = req
  const [error, user] = await to(User.findById(userId).lean())
  if (error) return res.status(500).send({ error })
  return res.send({ user })
})

userRouter.post('/signup', async (req, res) => {
  const { password, email, username } = req.body

  // if (req.query.password1 != req.query.password2) {
  //   res.status(401).send({ error: 'Passwords Do Not Match' })
  //   return
  // }
  // const [error1, user1] = await to(
  //   User.findOne({ username: req.query.username }).lean()
  // )
  // if (user1) {
  //   res.status(401).send({ error: 'Username already in use' })
  //   return
  // }
  // const [error2, user2] = await to(
  //   User.findOne({ email: req.query.email }).lean()
  // )
  // if (user2) {
  //   res.status(401).send({ error: 'Email already in use' })
  //   return
  // }
  // if (/^\S+@\S+\.\S+$/.test(req.query.email) === false) {
  //   res.status(401).send({ error: 'Invalid Email' })
  //   return
  // }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = new User({
    username,
    password: hash,
    email,
  })

  const [error] = await to(user.save())

  if (error) {
    if (error.code === 11000) {
      // duplicate field(s)
      const duplicateFields = Object.keys(error.keyPattern)
      return res.status(500).send({
        message: `Duplicate field(s):${duplicateFields.map((f) => ` ${f}`)}`,
        error: 'Duplicate field',
      })
    }
    return res.status(500).send({ error })
  }

  const token = jwt.sign(
    {
      userId: user._id.toString(),
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_LIFE }
  )

  res.cookie('access-token', token, {
    httpOnly: process.env.NODE_ENV !== 'development',
    secure: process.env.NODE_ENV !== 'development',
  })
  return res.send({ userId: user._id })
})

userRouter.post('/login', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password)
    return res.status(401).send({
      message: 'Username and password required',
      error: 'Username and password required',
    })

  const [error, user] = await to(User.findOne({ username }).lean())

  if (error) return res.status(500).send({ error })

  if (!user)
    return res.status(401).send({
      message: 'An account with that username does not exist',
      error: 'User does not exist',
    })

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(401).send({
      message: 'Password incorrect',
      error: 'Password incorrect',
    })

  const token = jwt.sign(
    {
      userId: user._id.toString(),
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_LIFE }
  )

  res.cookie('access-token', token, {
    httpOnly: process.env.NODE_ENV !== 'development',
    secure: process.env.NODE_ENV !== 'development',
  })
  return res.send({ userId: user._id })
})

userRouter.post('/logout', async (req, res) => {
  return res.clearCookie('access-token').send({ message: 'Logout' })
})

export default userRouter
