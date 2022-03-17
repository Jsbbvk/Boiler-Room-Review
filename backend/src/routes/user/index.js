import { Router } from 'express'

const userRouter = Router()

userRouter.get('/', (req, res) => {
  res.send('user')
})

userRouter.post('/', (req, res) => {})

userRouter.get('/login', (req, res) => {
  console.log(req.query)
})

export default userRouter
