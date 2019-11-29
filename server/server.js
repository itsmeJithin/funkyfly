require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('config.json');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const server = require('http').Server(app);
const io = require('socket.io')(server);

//Adding socket io instance to request object, so we can use this socketIO inside controllers
app.use(function (req, res, next) {
  req.io = io;
  next()
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());
// app.set('superSecret', config.secret)
// api routes
app.use('/users', require('./users/users.controller'));
app.use('/users/messages/', require('./messages/message.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8081;
server.listen(port, function () {
  console.log('Server listening on port ' + port)
});
let onlineUsers = [];
io.on('connection', function (socket) {

  console.log('Socket Connection Established with ID :' + socket.id);
  socket.on('makeMeOnline', function (user, callback) {
    user.socketId = socket.id;
    onlineUsers.push(user);
    io.sockets.emit('connectedUsers', onlineUsers)
  });
  socket.on('disconnect', function () {
    let i = 0;
    while (i < onlineUsers.length) {
      if (onlineUsers[i].socketId === socket.id) {
        break
      }
      i++
    }
    console.log(socket.id + ' disconnect');
    onlineUsers.splice(i, 1);
    io.sockets.emit('connectedUsers', onlineUsers)
  });
  socket.on('sendMessage', function (messageObject) {
    console.log(messageObject);
    let userToken = messageObject.sendBy.token;

    socket.to(messageObject.sendTo.socketId).emit('receiveMessage', messageObject)
    // socket.emit('senderPeer', message, socket.id, receiver)
  })
});
async function verifyUser (token) {
  return new Promise((resolve, reject) => {
    // setTimeout to mock a cache or database call
    setTimeout(() => {
      // this information should come from your cache or database
      const users = [
        {
          id: 1,
          name: 'mariotacke',
          token: 'secret token',
        },
      ];

      const user = users.find((user) => user.token === token);

      if (!user) {
        return reject('USER_NOT_FOUND');
      }

      return resolve(user);
    }, 200);
  });
}
module.exports.activeUsers = onlineUsers;
