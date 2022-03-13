import { Router } from 'express'

// split up /review and /reviews routes
const wrapper = Router()
const reviewRouter = Router()
const reviewsRouter = Router()

wrapper.use('/review', reviewRouter)
wrapper.use('/reviews', reviewsRouter)

reviewsRouter.get('/', (req, res) => {
  res.send({ reviews: [] })
})

reviewRouter.get('/', (req, res) => {
  const query = req.query
  res.send({ query })
})

reviewRouter.get('/:id', (req, res) => {
  const { id } = req.params
  res.send({ id })
})

reviewRouter.post('/', (req, res) => {})

export default wrapper
