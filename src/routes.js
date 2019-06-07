const express = require('express')

const routes = express.Router()

const UserController = require('./app/controllers/User')

routes.post('/user', UserController.store)

module.exports = routes
