const R = require('ramda')

const Library = require('../models/Library')

module.exports = {
  async index (req, res) {
    const filters = {}

    if (req.query.year_end || req.query.year_start) {
      filters.year = {}

      if (req.query.year_start) filters.year.$gte = req.query.year_start

      if (req.query.year_end) filters.year.$lte = req.query.year_end
    }

    if (req.query.isbn) filters.isbn = req.query.isbn

    if (req.query.title) filters.title = req.query.title

    if (req.query.author) filters.author = req.query.author

    const books = await Library.paginate(filters, {
      limit: 3,
      page: req.query.page || 1,
      sort: '-created_at'
    })

    return res.status(200).json(books)
  },

  async show (req, res) {
    const id = req.params.id

    if (!id) res.status(400).json({ error: 'Invalid book id.' })

    const book = await Library.findById(id)

    return res.status(200).json(book)
  },

  async store (req, res) {
    const pick = ['title', 'isbn', 'author', 'publishing_company', 'year', 'language', 'weight', 'dimensions']
    let book = R.pick(pick, req.body)

    book = await Library.create(book)

    return res.status(201).json(book)
  },

  async destroy (req, res) {
    const id = req.params.id

    if (!id) res.status(400).json({ error: 'Invalid book id.' })

    if (!await Library.findByIdAndDelete(id)) res.status(400).json({ error: 'book not found or already deleted.' })

    return res.send({ message: `book with id${id} deleted` }).status(200)
  }
}
