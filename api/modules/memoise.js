import config from '../../config'
import keyv from 'keyv'
import redis from 'redis'

// Caso a conexão com o Redis esteja ativada, cria uma instância de conexão
const redisConn = (config.redis.enabled) ? redis.createClient({ url: config.redis.uri }) : void (0)

// Caso a conexão com o Redis esteja desativada, 
// retorna o método com funções vazias
const memoiseDisabled = () => {
  return {
    clear: async () => {},
    flush: async () => {},
    get: async () => {},
    set: async () => {}
  }
}

// É possível criar várias instâncias memoise com base no namespace
const memoise = (namespace) => {
  const map = new keyv(
    (config.redis.enabled ? config.redis.uri : void (0)),
    { namespace }
  )
  return {
    clear: async () => map.clear(),
    flush: async () => {
      if (redisConn) {
        return new Promise((resolve, reject) => {
          redisConn.FLUSHALL((err, res) => {
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
