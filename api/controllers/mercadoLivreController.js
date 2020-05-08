import { searchProduct } from '../services/searchProductService'

export const search = async (req, res) => {
  try {
    const { search, limit } = req.body

    let products = []
    let result = null

    while (limit > products.length) {
      result = await searchProduct(search, limit, products.length)
      products = products.concat(result)
    }

    return res.json({ data: products })
  } catch (err) {
    if (err.response.status === 404) {
      return res.status(404).json({ message: 'Product not found' })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}