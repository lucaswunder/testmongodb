const R = require('ramda')
const User = require('../models/User')

class SessionController {
  async store (req, res) {
    let data = req.body
    data = R.pick(['email', 'password'], data)

    if (!data) {
      return res.status(400).json({ error: 'Invalid request' })
    }

    const user = await User.findOne({ email: data.email })

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    if (!await user.compareHash(data.password)) {
      return res.status(400).json({ error: 'Invalid request' })
    }

    return res.json({ user, token: User.generateToken(user) })
  }
}
module.exports = new SessionController()
