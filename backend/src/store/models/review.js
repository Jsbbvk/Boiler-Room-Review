import { model, Schema, SchemaTypes } from 'mongoose'

const ReviewSchema = new Schema({
  author: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
    required: true,
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

const Review = model('review', ReviewSchema)

export default Review
