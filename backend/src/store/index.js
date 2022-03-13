import mongoose from 'mongoose'

const setup = async (uri) => {
  const mongoURI = uri || process.env.ATLAS_URI

  if (!mongoURI) {
    console.log('missing ATLAS_URI env')
    return
  }
  await mongoose.connect(mongoURI).catch((err) => {
    console.error(err)
  })

  const db = mongoose.connection
  db.once('open', () => {
    console.log('connected to mongodb')
  })
}

export default setup
