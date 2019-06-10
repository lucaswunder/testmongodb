const mongoose = require('mongoose')

const request = require('supertest')

const app = require('../index')
const User = mongoose.model('User')

describe('Session', () => {
  beforeEach(async () => {
    await User.remove()
  })

  // Integration test for login
  it('Should be able to login', async (done) => {
    const user = await User.create({
      name: 'lucas',
      email: 'wunder@gmail.com',
      password: '1234'
    })

    const response = await request(app).post('/session').send({
      email: user.email,
      password: '1234'
    })

    expect(response.status).toBe(200)
    done()
  })

  // Integration test
  it('Should not be able to login', async (done) => {
    const response = await request(app).post('/session').send({
      email: 'xablau@gmail.com',
      password: 'xablau'
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error')
    done()
  })

  // Integration test (validations)
  it('Should not be able to login (invalid request)', async (done) => {
    const response = await request(app).post('/session').send({
      name: 'xablau@gmail.com',
      password: 'xablau'
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('errors')
    expect(response.body).toHaveProperty('statusText', 'Bad Request')
    done()
  })
})
