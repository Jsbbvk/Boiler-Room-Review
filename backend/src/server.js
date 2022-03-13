import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'
import bodyParser from 'body-parser'
import mongooseConnect from './store'
import { buildingRouter, reviewRouter, roomRouter, userRouter } from './routes'

require('dotenv-flow').config()

const app = express()
const port = 8080

mongooseConnect('mongodb://127.0.0.1:27017/boiler-room-review')

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('hi!')
})

app.use('/building', buildingRouter)
app.use('/room', roomRouter)
app.use('/', reviewRouter)
app.use('/user', userRouter)

app.listen(port, () => {
  console.log(`started server in node env: ${process.env.NODE_ENV}`)
  console.log(`server listening on port ${port}`)
})
