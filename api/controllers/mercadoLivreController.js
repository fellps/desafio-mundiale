import md5 from 'md5'
import result from '../modules/result'
import memoise from '../modules/memoise'
import { searchProduct } from '../services/searchProductService'

const memoiseData = memoise('MERCADO_LIVRE_SEARCH')

export const search = async (req, res) => {
  try {
    const { search, limit } = req.body

    // Verifica se existe um cache em memória para a busca atual
    const searchKey = md5(JSON.stringify(req.body))
    const resultMemoise = await memoiseData.get(searchKey)

    // Caso exista um cache da requisição em memória, retorna imediatamente
    if (resultMemoise) return result.success.successOnSearch(res, resultMemoise)

    let products = []
    const searches = []
    const pagination = Math.ceil(limit / 51)

    // Armazena as promises das buscas em um array
    for (let i = 1; i <= pagination; i++) {
      searches[i] = searchProduct(search, i * 50)
    }

    // Resolve todas as promises
    let results = await Promise.all(searches)

    // Preenche o array de produtos
    results.forEach(result => {
      result && result.forEach(product => products.push(product))
    })

    // Filtra a quantidade de produtos necessários
    products = products.slice(0, limit)
    
    // Armazena o resultado da busca em cache
    memoiseData.set(searchKey, products, 60 * 60 * 100)

    return result.success.successOnSearch(res, products)
  } catch (err) {
    if (err.message === '404 Not Found') {
      const log = `Product not found: ${JSON.stringify(req.body)}`
      return result.notFound.notFoundProduct(res, null, log)
    }
    return result.internalError.internalError(res, null, err.stack)
  }
}