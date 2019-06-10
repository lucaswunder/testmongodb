const R = require('ramda')
const Product = require('../models/Product')
const Store = require('../models/Store')

class ProductController {
  async index (req, res) {
    const filters = {}

    if (req.query.price_min || req.query.price_max) {
      filters.price = {}

      if (req.query.price_min) {
        filters.price.$gte = req.query.price_min
      }

      if (req.query.price_max) {
        filters.price.$lte = req.query.price_max
      }
    }

    if (req.query.name) {
      filters.name = new RegExp(req.query.name, 'i')
    }

    if (req.query.store) {
      filters.store = req.query.store
    }

    const products = await Product.paginate(filters, {
      limit: 3,
      page: req.query.page || 1,
      sort: '-createdAt'
    })

    return res.status(200).json(products)
  }

  async show (req, res) {
    const id = req.params.id

    if (!id) {
      res.status(400).json({ error: 'Invalid product id.' })
    }

    const product = await Product.findById(id)

    return res.status(200).json(product)
  }

  async store (req, res) {
    const pick = ['name', 'description', 'price', 'amount', 'store']
    let product = R.pick(pick, req.body)

    const store = await Store.findById(product.store)

    product = await Product.create(product)

    store.products.push(product.id)

    await store.save()

    return res.status(201).json(product)
  }

  async update (req, res) {
    let product = R.pick(['name', 'description', 'price', 'amount'], req.body)
    const id = req.params.id

    if (!id) {
      res.status(400).json({ error: 'Invalid product id.' })
    }

    product = await Product.findByIdAndUpdate(id, product, {
      new: true
    })

    return res.status(200).json(product)
  }

  async destroy (req, res) {
    const id = req.params.id

    if (!id) {
      res.status(400).json({ error: 'Invalid product id.' })
    }

    await Product.findByIdAndDelete(id)

    return res.send()
  }
}

module.exports = new ProductController()
