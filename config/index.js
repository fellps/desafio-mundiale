import 'dotenv/config'

export default {
  environment: process.env.ENVIRONMENT,
  apiPort: process.env.API_PORT || 3000,
  mercadoLivreUrl: process.env.MERCADO_LIVRE_URL,
  redis: {
    enabled: Boolean(Number(process.env.REDIS_ENABLED || 0)),
    uri: process.env.REDIS_URI
  },
  memoise: {
    enabled: Boolean(Number(process.env.MEMOISE_ENABLED || 0)),
  }
}