const R = require('ramda')
const User = require('../models/User')

class UserController {
  async store (req, res) {
    let data = req.body

    data = R.pick(['email', 'name', 'password'], data)
    const { email } = data

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'User already exists, please login' })
    }

    const user = await User.create(data)

    if (!user) {
      return res.status(401).json({ error: 'User could not be created, please try again later.' })
    }

    return res.status(201).json(user)
  }
}

module.exports = new UserController()
