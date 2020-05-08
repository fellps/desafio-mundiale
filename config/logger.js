import { 
  createLogger,
  transports,
  format 
} from 'winston'
import config from '../config'

export const logger = createLogger({
  transports: [
    new transports.File({
      level: 'info',
      maxsize: 1024 * 1024 * 20, // 10MB
      maxFiles: 5,
      filename: 'logs/api.log',
      format: format.combine(format.timestamp(), format.json())
    }),
    config.environment !== 'production' && new transports.Console({
      level: 'info',
      format: format.combine(format.timestamp(), format.json())
    })
    // Aqui poderiamos adicionar um banco de dados como o MongoDB
  ]
})