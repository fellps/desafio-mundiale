import messages from './messages'
import { logger } from '../../config/logger'
import _ from 'lodash'

// Resposta padrão em caso de sucesso
const success = (code, res, resultData = {}) => {
  const result = {
    data: resultData,
    message: messages[code] || 'Server Problem'
  }
  return res.status(200).send(result)
}

// Resposta padrão para erros 404
const notFound = (code, res, resultData = {}, log) => {
  log && logger.log('warn', log)
  const result = {
    data: resultData,
    message: messages[code] || 'Server Problem',
  }
  return res.status(404).send(result)
}

// Resposta padrão para erros internos
const internalError = (code, res, resultData = {}, log) => {
  log && logger.log('error', log)
  const result = {
    data: resultData,
    message: messages[code] || 'Server Problem',
  }
  return res.status(500).send(result)
}

// Retorna um response com base no tipo de result informado
const mapMessages = (fn) => {
  return _.mapValues(messages, (o, code) => (res, resultData, log) => fn(code, res, resultData, log))
}

export default {
  success: mapMessages(success),
  notFound: mapMessages(notFound),
  internalError: mapMessages(internalError)
}