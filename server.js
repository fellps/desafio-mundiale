import express from 'express'
import bodyParser from 'body-parser'
import swaggerExpress from 'swagger-express-mw'

import { logger } from './config/logger'
import config from './config'

const swaggerConfig = {
  appRoot: __dirname // required config
}

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

swaggerExpress.create(swaggerConfig, (err, middleware) => {
  if (err) throw err

  // install middleware
  middleware.register(app)

  // listen on port 300
  app.listen(config.apiPort, () => {
    logger.log('info', `Server is listening on port ${config.apiPort}!`)
  })
})

if (process.env.TEST_MODE) {
  module.exports = app // for testing
}