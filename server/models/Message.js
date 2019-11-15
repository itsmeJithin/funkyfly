var mongoose = require('mongoose')
var Schema = mongoose.Schema

var MessageSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  sendTo: {
    type: String,
    required: true
  }
})

var Message = mongoose.model('Message', MessageSchema)
module.exports = Message
