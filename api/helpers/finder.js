const find = (el, selector) => {
  return el.find(selector).text().trim()
}

const findLink = (el, selector) => {
  return el.find(selector).attr('href')
}

export {
  find,
  findLink
}