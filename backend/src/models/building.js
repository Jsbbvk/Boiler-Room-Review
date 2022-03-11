import { model, Schema, SchemaTypes } from 'mongoose'

const BuildingSchema = new Schema({
  short_name: {
    type: SchemaTypes.String,
    required: true,
  },
  name: {
    type: SchemaTypes.String,
    required: true,
  },
  address: {
    type: SchemaTypes.String,
    required: false,
  },
  building_type: {
    type: SchemaTypes.String,
    enum: ['LIBRARY', 'DORM', 'INSTRUCTIONAL', 'MISC'],
    default: 'INSTRUCTIONAL',
  },
  rooms: [
    {
      type: SchemaTypes.ObjectId,
      ref: 'room',
    },
  ],
})

const Building = model('building', BuildingSchema)

export default Building
