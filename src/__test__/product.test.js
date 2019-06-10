const mongoose = require('mongoose')

const request = require('supertest')

const app = require('../index')
const Product = mongoose.model('Product')

beforeEach(async () => {
  await Product.deleteMany()
})

describe('Products', () => {
  it('Should be able to get an product list', async (done) => {
    await Product.create({
      name: 'camisa',
      description: 'camsia',
      price: '1234',
      amount: '10',
      store: '5cfdde2603dafa0b00f3c56d'
    })

    const response = await request(app).get('/product')

    expect(response.status).toBe(200)
    expect(response.body.docs.length).toBeGreaterThanOrEqual(1)

    done()
  })
})
