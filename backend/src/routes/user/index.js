import { Router } from 'express'
import { Types } from 'mongoose'
import { User } from '../../store/models'
import to from 'await-to-js'
const bcrypt = require('bcrypt')

const wrapper = Router()
const signInRouter = Router()
const signUpRouter = Router()

wrapper.use('/login', signInRouter)
wrapper.use('/signup', signUpRouter)

signUpRouter.get('/signup', async (req, res) => {
  if (req.query.password1 != req.query.password2) {
    res.status(401).send({ error: 'Passwords Do Not Match' })
    return
  }
  const [error1, user1] = await to(
    User.findOne({ username: req.query.username }).lean()
  )
  if (user1) {
    res.status(401).send({ error: 'Username already in use' })
    return
  }
  const [error2, user2] = await to(
    User.findOne({ email: req.query.email }).lean()
  )
  if (user2) {
    res.status(401).send({ error: 'Email already in use' })
    return
  }
  if (/^\S+@\S+\.\S+$/.test(req.query.email) === false) {
    res.status(401).send({ error: 'Invalid Email' })
    return
  }

  const salt = await bcrypt.genSalt(10)
  const newPass = await bcrypt.hash(req.query.password1, salt)
  console.log(newPass)

  const newUserData = {
    username: req.query.username,
    password: newPass,
    email: req.query.email,
    reviews: [],
  }

  const newUser = new User(newUserData)

  const [saveError, saveResult] = await to(newUser.save())

  if (saveError) {
    res.status(500).send({ error: 'Error saving to Database' })
    return
  }

  res.status(200).send('Successful account creation')
  return
})

signInRouter.get('/login', async (req, res) => {
  const [error, user] = await to(
    User.findOne({ username: req.query.username }).lean()
  )
  if (user) {
    const validPassword = await bcrypt.compare(
      req.query.password,
      user.password
    )
    if (validPassword) {
      res.status(200).send('Successful Login')
    } else {
      res.status(401).send({ error: 'Password incorrect' })
    }
  } else {
    res
      .status(401)
      .send({ error: 'An account with that username does not exist' })
    return
  }
  /*const salt = await bcrypt.genSalt(10)
  const n = await bcrypt.hash(req.query.password, salt)
  console.log(n)*/
})

export default signInRouter
