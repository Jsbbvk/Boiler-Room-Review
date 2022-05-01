import { model, Schema, SchemaTypes } from 'mongoose'

const UserSchema = new Schema({
  username: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
  },
  email: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
  },
  password: {
    type: SchemaTypes.String,
    required: true,
  },
  reviews: [
    {
      type: SchemaTypes.ObjectId,
      ref: 'review',
    },
  ],
})

UserSchema.index({ username: 1, email: 1 })
const User = model('user', UserSchema)

export default User
