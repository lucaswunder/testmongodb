const R = require('ramda')
const User = require('../models/User')

class UserController {
  async store (req, res) {
    let data = req.body

    data = R.pick(['email', 'name', 'password'], data)
    const { email } = req.body

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const user = await User.create(data)

    return res.status(201).json(user)
  }
}

module.exports = new UserController()
