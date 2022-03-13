import mongoose from 'mongoose'

const setup = () => {
  const uri = process.env.ATLAS_URI

  if (!uri) {
    console.log('missing ATLAS_URI env')
    return
  }
  mongoose.connect(uri).catch((err) => {
    console.error(err)
  })

  const db = mongoose.connection
  db.once('open', () => {
    console.log('connected to mongodb')
  })
}

export default setup
