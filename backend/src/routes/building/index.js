import { Router } from 'express'
import { Building } from '../../store/models'

const buildingRouter = Router()

/**
 * Create a new building
 */
buildingRouter.post('/', async (req, res) => {
  const buildingData = req.body

  try {
    const building = new Building(buildingData)
    await building.save()
    return res.status(200).send({ id: building.id })
  } catch (e) {
    return res.status(500).send({ message: e.message })
  }
})

/**
 * Get all building
 */
buildingRouter.get('/', async (req, res) => {
  try {
    const buildings = await Building.find({}).exec()
    return res.status(200).send({ items: buildings })
  } catch (e) {
    return res.status(500).send({ message: e.message })
  }
})

/**
 * Get a specific building
 */
buildingRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const building = await Building.findById(id).exec()
    if (!building)
      return res.status(400).send({ message: 'No such building exists' })

    return res.status(200).send(building)
  } catch (e) {
    return res.status(500).send({ message: e.message })
  }
})

/**
 * Update a specific building
 */
buildingRouter.patch('/:id', async (req, res) => {
  const update = req.body
  const { id } = req.params

  try {
    await Building.findByIdAndUpdate(id, update).exec()
    return res.status(200).send({ message: 'Updated building' })
  } catch (e) {
    return res.status(500).send({ message: e.message })
  }
})

/**
 * Delete a specific building
 */
buildingRouter.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    await Building.findByIdAndRemove(id).exec()
    return res.status(200).send({ message: 'Deleted building' })
  } catch (e) {
    return res.status(500).send({ message: e.message })
  }
})

/**
 * Search for a building
 */
buildingRouter.post('/search', async (req, res) => {
  const { name, type } = req.query

  try {
    let query = {}

    if (req.query.name) {
      query = {
        ...query,
        $or: [
          { name: { $regex: `^${name}.*`, $options: 'i' } },
          { short_name: { $regex: `^${name}.*`, $options: 'i' } },
        ],
      }
    }

    if (req.query.type) {
      query = {
        ...query,
        building_type: type,
      }
    }

    const buildings = await Building.find(query).exec()
    return res.status(200).send({ items: buildings })
  } catch (e) {
    return res.status(500).send({ message: e.message })
  }
})

export default buildingRouter
