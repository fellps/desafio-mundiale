import express from 'express'
import bodyParser from 'body-parser'
import swaggerExpress from 'swagger-express-mw'

import config from './config'

const swaggerConfig = {
  appRoot: __dirname // required config
}

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log(`Request coming => ${req.originalUrl}`)
  next()
})

swaggerExpress.create(swaggerConfig, (err, middleware) => {
  if (err) throw err

  // install middleware
  middleware.register(app)

  // listen on port 300
  app.listen(config.apiPort, () => {
    console.log(`Server is listening on port ${config.apiPort}!`)
  })
})