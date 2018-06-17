var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname + '/public/index.html'));

app.get('/', function(req, res){
  res.status(200).send({ msg: 'hello' });
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('test', function(data) {
    console.log(data);
  });
  io.emit('new message', {
      username: 'ayoub',
      message: 'bonjour'
  });
});

const PORT = process.env.PORT || 8080;
http.listen(PORT, function(){
  console.log('listening on *:3000');
})