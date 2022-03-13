import { model, Schema, SchemaTypes } from 'mongoose'
import { ROOM_TYPES } from '../../constants'

const RoomSchema = new Schema({
  room_number: {
    type: SchemaTypes.String,
    required: true,
  },
  building: {
    type: SchemaTypes.ObjectId,
    ref: 'building',
  },
  room_type: {
    type: SchemaTypes.String,
    enum: Object.values(ROOM_TYPES),
    default: 'CLASSROOM',
  },
})

RoomSchema.index({ room_number: 1 })

const Room = model('room', RoomSchema)

export default Room
