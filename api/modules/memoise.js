import config from '../../config'

const Keyv = require('keyv')
const redis = require('redis')

const redisConn = (config.redis.enabled) ? redis.createClient({ url: config.redis.uri }) : void (0)

const memoiseDisabled = function () {
  return {
    clear: async () => {},
    flush: async () => {},
    get: async () => {},
    set: async () => {}
  }
}

const memoise = function (namespace) {
  const _uuid = 'MercadoLivre' + namespace
  const map = new Keyv(
    (config.redis.enabled ? config.redis.uri : void (0)),
    { namespace: _uuid }
  )
  return {
    clear: async () => map.clear(),
    flush: async () => {
      if (redisConn) {
        return new Promise(function (resolve, reject) {
          redisConn.FLUSHALL(function (err, res) {
            if (err) return reject(err)
            resolve(res)
          })
        })
      }
      return map.clear()
    },
    get: async key => {
      const res = await map.get(key)
      if (res) return JSON.parse(res)
    },
    set: async (key, entrie, ttl) => {
      return map.set(key, JSON.stringify(entrie), ttl)
    }
  }
}

export default config.redis.enabled ? memoise : memoiseDisabled
