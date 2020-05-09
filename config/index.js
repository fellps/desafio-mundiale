import 'dotenv/config'

export default {
  environment: process.env.ENVIRONMENT,
  apiPort: process.env.PORT || 3000,
  mercadoLivreUrl: process.env.MERCADO_LIVRE_URL,
  redis: {
    enabled: !process.env.TEST_MODE && Boolean(Number(process.env.REDIS_ENABLED || 0)),
    uri: process.env.REDIS_URI
  }
}