// Busca de texto
const find = (el, selector) => {
  return el.find(selector).text().trim()
}

// Busca de links
const findLink = (el, selector) => {
  return el.find(selector).attr('href')
}

export {
  find,
  findLink
}