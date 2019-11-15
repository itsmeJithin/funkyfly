const UserService = require('./user.service')
const express = require('express')
const router = express.Router()
const config = require('config.json')
const jwt = require('jsonwebtoken')

router.post('/authenticate', authenticate)
router.post('/register', register)
router.get('/get-user', getUserById)
router.post('/get-all-users', getAllUsers)
router.post('/get-logged-in-user', getLoggedInUser)

module.exports = router

function getLoggedInUser (req, res, next) {
  let jwtToken = req.headers.authorization
  jwtToken = jwtToken.replace('Bearer ', '')
  if (!jwtToken) {
    res.send(400).json({message: 'Invalid authorization'})
  }
  const tokenPart = jwt.verify(jwtToken, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  })
  UserService.getById(tokenPart.sub)
    .then(user => user ? res.json(user) : res.status(400).json({message: 'Invalid login token given'}))
    .catch(err => next(err))
}

function authenticate (req, res, next) {
  let username = req.body.username
  let password = req.body.password

  UserService.authenticate({username: username, password: password})
    .then(user => user ? res.json(user) : res.status(400).json({message: 'Username or password is incorrect'}))
    .catch(err => next(err))

}

function register (req, res, next) {
  let username = req.body.username
  let password = req.body.password
  let email = req.body.email
  let name = req.body.name
  let mobile = req.body.mobile

  UserService.create({username: username, password: password, email: email, name: name, mobile: mobile})
    .then(() => res.json({}))
    .catch(err => next(err))
}

function getUserById (req, res, next) {
  let userId = req.query.userId
  if (userId) {
    UserService.getById(userId)
      .then(user => user ? res.json(user) : res.status(400).json({message: 'Something went wrong.User details not found'}))
      .catch(err => next(err))
  } else {
    res.status(500).json({message: 'Invalid argument received'})
  }

}

function getAllUsers (req, res, next) {
  UserService.getAll()
    .then(user => user ? res.json(user) : res.status(400).json({message: 'Something went wrong.User details not found'}))
    .catch(err => next(err))
}
