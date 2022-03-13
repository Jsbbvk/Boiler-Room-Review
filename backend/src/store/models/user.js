import { model, Schema, SchemaTypes } from 'mongoose'

const UserSchema = new Schema({
  username: {
    types: SchemaTypes.String,
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

const User = model('user', UserSchema)

export default User
