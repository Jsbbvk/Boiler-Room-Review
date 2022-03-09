import mongoose from 'mongoose'

const uri = 'mongodb://127.0.0.1:27017/boilerreview'

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
