import { model, Schema, SchemaTypes } from 'mongoose'
import { BUILDING_TYPES } from '../../constants'

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
    enum: Object.values(BUILDING_TYPES),
    default: 'INSTRUCTIONAL',
  },
  rooms: [
    {
      type: SchemaTypes.ObjectId,
      ref: 'room',
    },
  ],
})

BuildingSchema.index({ name: 1 })

const Building = model('building', BuildingSchema)

export default Building
