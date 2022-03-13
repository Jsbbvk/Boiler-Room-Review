import { Router } from 'express'

const buildingRouter = Router()

buildingRouter.get('/', (req, res) => {
  res.send('building')
})

buildingRouter.post('/', (req, res) => {})

export default buildingRouter
