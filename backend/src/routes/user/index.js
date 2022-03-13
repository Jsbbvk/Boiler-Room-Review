import { Router } from 'express'

const userRouter = Router()

userRouter.get('/', (req, res) => {
  res.send('user')
})
userRouter.post('/', (req, res) => {})

export default userRouter
