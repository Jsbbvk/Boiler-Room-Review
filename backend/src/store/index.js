import mongoose from 'mongoose'

const uri =
  'mongodb+srv://admin:admin@cluster0.p4pde.mongodb.net/boiler-room-review?retryWrites=true&w=majority'

const setup = () => {
  mongoose.connect(uri).catch((err) => {
    console.error(err)
  })

  const db = mongoose.connection
  db.once('open', () => {
    console.log('connected to mongodb')
  })
}

export default setup
