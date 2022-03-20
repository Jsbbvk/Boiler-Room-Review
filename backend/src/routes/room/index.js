import { Router } from 'express'
import { Building, Room } from '../../store/models'

const roomRouter = Router()

roomRouter.post('/', async (req, res) => {
  const roomData = req.body

  try {
    // Check that the building exists
    const building = await Building.findById(roomData.building)
    if (!building)
      return res.status(400).send({ message: 'No such building exists' })

    // Create the room
    const room = new Room(roomData)
    await room.save()

    building.rooms.push(room.id)
    await building.save()

    return res.status(200).send({ id: room.id })
  } catch (e) {
    return res.status(500).send({ message: e.message })
  }
})

roomRouter.get('/', async (req, res) => {
  try {
    const rooms = await Room.find({}).exec()
    return res.status(200).send({ items: rooms })
  } catch (e) {
    return res.status(500).send({ message: e.message })
  }
})

roomRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const room = await Room.findById(id).exec()
    if (!room) return res.status(400).send({ message: 'No such room exists' })

    return res.status(200).send(room)
  } catch (e) {
    return res.status(500).send({ message: e.message })
  }
})

roomRouter.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    await Room.findByIdAndRemove(id).exec()
    return res.status(200).send({ message: 'Deleted room' })
  } catch (e) {
    return res.status(500).send({ message: e.message })
  }
})

export default roomRouter
