import { searchProduct } from '../services/searchProductService'
import result from '../modules/result'
import memoise from '../modules/memoise'

export const search = async (req, res) => {
  try {
    const memoiseData = memoise('MERCADO_LIVRE_SEARCH')
    const resultMemoise = await memoiseData.get('sha1')
    if (resultMemoise) console.log(resultMemoise)
    memoiseData.set('sha1', {teste: '1234'}, 10000)

    const { search, limit } = req.body

    let products = []
    let data = null

    while (limit > products.length) {
      data = await searchProduct(search, limit, products.length)
      products = products.concat(data)
    }

    return result.success.successOnSearch(res, products)
  } catch (err) {
    if (err.message === '404 Not Found') {
      const log = `Product not found: ${JSON.stringify(req.body)}`
      return result.notFound.notFoundProduct(res, null, log)
    }
    return result.internalError.internalError(res, null, err.stack)
  }
}