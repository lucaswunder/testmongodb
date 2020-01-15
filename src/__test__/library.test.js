const mongoose = require('mongoose')

const request = require('supertest')

const app = require('../index')
const Library = mongoose.model('library')

describe('Library', () => {
  beforeEach(async () => {
    await Library.deleteMany()
  })

  // afterEach(() => setTimeout(() => process.exit(11), 40))

  it('Should be able to get an book list', async (done) => {
    await Library.create({
      title: 'new book',
      isbn: 1234,
      yaer: '2019'
    })

    const response = await request(app).get('/library')

    expect(response.status).toBe(200)
    expect(response.body.docs.length).toBeGreaterThanOrEqual(1)

    done()
  })
})
