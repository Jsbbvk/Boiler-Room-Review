import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongooseConnect from './store'
import { buildingRouter, reviewRouter, roomRouter, userRouter } from './routes'
import { User } from './store/models'

require('dotenv-flow').config()

const app = express()
const port = 8080

app.use(
  cors({
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200,
    credentials: true,
  })
)

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('hi!')
})

app.use('/building', buildingRouter)
app.use('/room', roomRouter)
app.use('/', reviewRouter)
app.use('/user', userRouter)

mongooseConnect().then(async () => {
  await User.collection.drop()

  app.listen(port, () => {
    console.log(`node env: ${process.env.NODE_ENV}`)
    console.log(`server listening on port ${port}`)
  })
})
