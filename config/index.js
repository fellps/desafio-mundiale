import 'dotenv/config'

export default {
  apiPort: process.env.API_PORT || 3000,
  mercadoLivreUrl: process.env.MERCADO_LIVRE_URL
}