import to from 'await-to-js'
import { Router } from 'express'
import { Review } from '../../store/models'
import { Types } from 'mongoose'

// split up /review and /reviews routes
const wrapper = Router()
const reviewRouter = Router()
const reviewsRouter = Router()

wrapper.use('/review', reviewRouter)
wrapper.use('/reviews', reviewsRouter)

reviewsRouter.get('/', async (req, res) => {
  try {
    // TODO include filter
    const { pageNumber = 1, pageLimit = 10 } = req.query
    const [error, reviews] = await to(
      Review.find({})
        .limit(parseInt(pageLimit))
        .skip((parseInt(pageNumber) - 1) * parseInt(pageLimit))
        .populate('room building author')
        .lean()
    )

    const [errorCount, numDocuments] = await to(Review.countDocuments({}))
    if (error || errorCount)
      return res.status(500).send({ error: error || errorCount })

    return res.send({
      reviews,
      pageNumber: parseInt(pageNumber),
      totalPages: Math.ceil(numDocuments / parseInt(pageLimit)),
    })
  } catch (e) {
    return res.status(500).send({ error: 'Unexpected error' })
  }
})

reviewRouter.get('/', (req, res) => {
  const query = req.query
  res.send({ query })
})

reviewRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  if (!Types.ObjectId.isValid(id))
    return res.status(400).send({ error: 'Invalid review id' })

  const [error, review] = await to(
    Review.findById(id).populate('room building author').lean()
  )
  if (error) return res.status(500).send({ error })
  if (!review) return res.status(404).send({ review: null })
  return res.send({ review })
})

reviewRouter.post('/', (req, res) => {})

export default wrapper
