import axios from 'axios'
import cheerio from 'cheerio'
import config from '../../config'
import selector from '../helpers/mercadoLivreSelector'
import { find, findLink } from '../helpers/finder'

export const searchProduct = async (search, limit, total) => {
  if(total > 0) 
    search = `${search}_Desde_${total}`

  const url = `${config.mercadoLivreUrl}${search}`

  const { data: body } = await axios(url)
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