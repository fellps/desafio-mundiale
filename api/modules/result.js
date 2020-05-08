import messages from './messages'
import { logger } from '../../config/logger'
import _ from 'lodash'

const success = (code, res, resultData = {}) => {
  const result = {
    data: resultData,
    message: messages[code] || 'Server Problem'
  }
  return res.status(200).send(result)
}

const notFound = (code, res, resultData = {}, log) => {
  log && logger.log('warn', log)
  const result = {
    data: resultData,
    message: messages[code] || 'Server Problem',
  }
  return res.status(404).send(result)
}

const internalError = (code, res, resultData = {}, log) => {
  log && logger.log('error', log)
  const result = {
    data: resultData,
    message: messages[code] || 'Server Problem',
  }
  return res.status(500).send(result)
}

const mapMessages = (fn) => {
  return _.mapValues(messages, (o, code) => (res, resultData, log) => fn(code, res, resultData, log))
}

export default {
  success: mapMessages(success),
  notFound: mapMessages(notFound),
  internalError: mapMessages(internalError)
}