import cheerio from 'cheerio'
import config from '../../config'
import selector from '../helpers/mercadoLivreSelector'
import { find, findLink } from '../modules/finder'
import req from 'req-fast'

const fetchProducts = (url) => {
  return new Promise((resolve, reject) => {
    req(url, (err, resp) => {
      if (err) reject(err)
      resolve(resp)
    })
  })
}

export const searchProduct = async (search, limit, total) => {
  if(total > 0) 
    search = `${search}_Desde_${total}`

  const url = `${config.mercadoLivreUrl}${search}`

  const { body } = await fetchProducts(url)
  const $ = cheerio.load(body)

  return $(selector.PRODUCTS).map((i, element) => {
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
  }, []).get().slice(0, limit - total)
}