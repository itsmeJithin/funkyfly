const MessageService = require('./message.service')
const express = require('express')
const router = express.Router()
const config = require('config.json')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
router.post('/get-all-message', getAllConversations)
router.post('/save-message', saveMessage)

function getAllConversations (req, res, next) {
  let sender = req.body.sender
  let receiver = req.body.receiver

  MessageService.getAllConversation(sender, receiver)
    .then(conversation => res.json(conversation))
    .catch(err => next(err))
}

function saveMessage (req, res, next) {
  let createdBy = req.body.sender
  let message = req.body.message
  let createdOn = new Date()
  let sendTo = req.body.recipient
  MessageService.create({message: message, createdBy: createdBy, createdOn: createdOn, sendTo: sendTo})
    .then(function (response) {
      _.each(onlineUsers, function (user) {
        if (user._id === sendTo) {
          req.io.sockets.emit('messagesent', user)
        }
      })
      res.json({})
    })
    .catch(err => next(err))
}

module.exports = router
