const config = require('config.json')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('_helpers/db')
const Message = db.Message

module.exports = {
  create,
  getAllConversation,
}

async function create (messageParam) {
  const message = new Message(messageParam)
  return await message.save()
}

async function getAllConversation (sender, receiver) {
  return await Message.find({'createdBy': sender, 'sendTo': receiver})
}
