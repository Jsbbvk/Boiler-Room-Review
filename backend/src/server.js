import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import mongooseConnect from './store'
import { buildingRouter, reviewRouter, roomRouter, userRouter } from './routes'

require('dotenv-flow').config()

const app = express()
const port = 8080

app.use(
  cors({
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200,
  })
)

mongooseConnect()

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routers
app.use('/building', buildingRouter)
app.use('/room', roomRouter)
app.use('/', reviewRouter)
app.use('/user', userRouter)

app.listen(port, () => {
  console.log(`started server in node env: ${process.env.NODE_ENV}`)
  console.log(`server listening on port ${port}`)
})
