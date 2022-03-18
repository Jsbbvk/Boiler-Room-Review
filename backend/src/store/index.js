import mongoose from 'mongoose'

const setup = (uri) =>
  new Promise((res, rej) => {
    const mongoURI = uri || process.env.ATLAS_URI

    if (!mongoURI) {
      console.log('missing ATLAS_URI env')
      return
    }

    mongoose.connect(mongoURI).catch((err) => {
      console.error(err)
      rej(err)
    })

    const db = mongoose.connection
    db.once('open', () => {
      console.log('connected to mongodb')
      res()
    })
  })

export default setup
