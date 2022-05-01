import { model, Schema, SchemaTypes } from 'mongoose'

const ReviewSchema = new Schema({
  author: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
  },
  room: {
    type: SchemaTypes.ObjectId,
    ref: 'room',
    required: false,
  },
  building: {
    type: SchemaTypes.ObjectId,
    ref: 'building',
    required: true,
  },
  rating: {
    type: SchemaTypes.Number,
    required: true,
    max: 5,
    min: 1,
  },
  review: {
    type: SchemaTypes.String,
  },
})

ReviewSchema.index({ building: 1, rating: 1 })

const Review = model('review', ReviewSchema)

export default Review
