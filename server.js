import express from 'express'
import bodyParser from 'body-parser'
import swaggerExpress from 'swagger-express-mw'
import swaggerUi from 'swagger-ui-express'
import yaml from 'yamljs'

import { logger } from './config/logger'
import config from './config'

const swaggerConfig = {
  appRoot: __dirname
}

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Disponibiliza uma rota para acesso a documetação da API
app.use('/docs', swaggerUi.serve, swaggerUi.setup(yaml.load('./api/swagger/swagger.yaml')))

// Cria uma instacia de configuração do swagger com o express
swaggerExpress.create(swaggerConfig, (err, middleware) => {
  if (err) throw err

  // Registra o middleware do swagger no express
  middleware.register(app)

  // Servidor executando na porta 3000
  app.listen(config.apiPort, () => {
    logger.log('info', `Server is listening on port ${config.apiPort}!`)
  })
})

// Utilizado nos testes
if (process.env.TEST_MODE) {
  module.exports = app
}