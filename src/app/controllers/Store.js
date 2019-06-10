const R = require('ramda')
const Store = require('../models/Store')

class StoreController {
  async index (req, res) {
    const userId = req.userId

    const stores = await Store.find({ manager: userId })

    return res.status(200).json(stores)
  }

  async show (req, res) {
    const id = req.params.id

    if (!id) {
      res.status(400).json({ error: 'Invalid Store id.' })
    }

    const store = await Store.findById(id)

    return res.status(200).json(store)
  }

  async store (req, res) {
    const pick = ['name', 'description']
    let store = R.pick(pick, req.body)

    const manager = req.userId
    store = await Store.create({ ...store, manager })

    return res.status(201).json(store)
  }

  async update (req, res) {
    let store = R.pick(['name', 'description'], req.body)
    const id = req.params.id

    if (!id) {
      res.status(400).json({ error: 'Invalid Store id.' })
    }

    store = await Store.findByIdAndUpdate(id, store, {
      new: true
    })

    return res.status(200).json(store)
  }

  async destroy (req, res) {
    const id = req.params.id

    await Store.findByIdAndDelete(id)

    return res.send()
  }
}

module.exports = new StoreController()
