const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const hostname = '127.0.0.1'
const port = 3000

app.get('/', function(req, res){
  res.sendFile(__dirname + '/socketIo.html');
});

io.on('connection', function (socked) {
  console.log('A user connected');
  socked.on('disconnect', function () {
    console.log('A user disconnected');
  });

  socked.on('chat message', function (msg) {
    console.log('New message: ' + msg);
    socked.broadcast.emit('chat message', msg);
  });
});

  http.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
