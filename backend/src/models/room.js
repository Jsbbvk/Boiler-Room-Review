import { model, Schema, SchemaTypes } from 'mongoose'

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
    enum: ['CLASSROOM', 'LAB', 'BATHROOM', 'MISC'],
    default: 'CLASSROOM',
  },
})

const Room = model('room', RoomSchema)

export default Room
