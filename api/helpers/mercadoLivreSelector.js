const ROW = 'div.rowItem'
const ITEM = '.item__info'

export default {
  PRODUCTS: '.results-item',
  NAME: `${ROW} ${ITEM} .item__title`,
  LINK: `${ROW} a`,
  FRACTION: `${ROW} ${ITEM} .item__price .price__fraction`,
  DECIMALS: `${ROW} ${ITEM} .item__price .price__decimals`,
  STORE: `${ROW} a .item__brand-title-tos`,
  STATE: `${ROW} .item__condition`
}