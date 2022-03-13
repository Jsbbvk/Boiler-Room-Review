import { Router } from 'express'

const roomRouter = Router()

roomRouter.get('/', (req, res) => {
  res.send('room')
})

roomRouter.post('/', (req, res) => {})

export default roomRouter
