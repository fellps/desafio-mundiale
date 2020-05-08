import cheerio from 'cheerio'
import config from '../../config'
import selector from '../helpers/mercadoLivreSelector'
import { find, findLink } from '../modules/finder'
import req from 'req-fast'

// Retorna o resultado de uma busca
const fetchProducts = async url => {
  return await new Promise((resolve, reject) => {
    req(url, (err, resp) => {
      if (err) reject(err)
      resolve(resp)
    })
  })
}

// Retorna uma promise com os produtos de uma busca
export const searchProduct = (search, pagination) => {
  return new Promise((resolve, reject) => {
    (async () => {
      if(pagination > 0) 
        search = `${search}_Desde_${pagination}`

      const url = `${config.mercadoLivreUrl}${search}`

      // Obtem os dados de retorno da url
      const response = await fetchProducts(url).catch((err) => {
        reject(err)
      })

      // Se não existir um retorno, não faça nada
      if (!response) return

      // Carrega o html no cheerio
      const $ = cheerio.load(response.body)

      // Map sobre os produtos para extrair as informações dos elementos
      const products = $(selector.PRODUCTS).map((i, element) => {
        const el = $(element)

        const name = find(el, selector.NAME)
        const link = findLink(el, selector.LINK)
        const fraction = find(el, selector.FRACTION)
        const decimals = find(el, selector.DECIMALS)
        const store = find(el, selector.STORE).replace('por ', '') || null
        const state = find(el, selector.STATE) || null
      
        const price = Number.parseFloat(`${fraction}.${decimals}`)

        return {
          name,
          link,
          price,
          store,
          state
        }
      }, []).get()

      resolve(products)
    })()
  })
}