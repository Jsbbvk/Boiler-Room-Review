import { Router } from 'express'
import { Types } from 'mongoose'
import { User } from '../../store/models'
import to from 'await-to-js'
const bcrypt = require('bcrypt')

const userRouter = Router()

userRouter.get('/', (req, res) => {
  res.send('user')
})

userRouter.post('/', (req, res) => {})

userRouter.get('/login', async (req, res) => {
  const [error, user] = await to(
    User.findOne({ username: req.query.username }).lean()
  )
  const validPassword = await bcrypt.compare(req.query.password, user.password)
  /*const salt = await bcrypt.genSalt(10)
  const n = await bcrypt.hash(req.query.password, salt)
  console.log(n)*/
  if (validPassword) {
    res.status(200).send('Successful Login')
  } else {
    res.status(401).send({ error: 'Invalid username or password' })
  }
})

export default userRouter
