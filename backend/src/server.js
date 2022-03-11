import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'
import bodyParser from 'body-parser'

import mongooseConnect from './store'
import buildingRouter from './routers/building'

mongooseConnect()

const app = express()
const port = 8080

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routers
app.use('/building', buildingRouter)

app.get('/', (req, res) => {
  res.send('hi!')
})

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
