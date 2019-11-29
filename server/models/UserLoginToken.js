var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserLoginTokenSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        required: false
    },
    updatedOn: {
        type: Date,
        required: false
    }
});

var UserLoginToken = mongoose.model('UserLoginToken', UserLoginTokenSchema);
module.exports = UserLoginToken;
