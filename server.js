var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const URI = "mongodb://my-child:3afritto@ds261540.mlab.com:61540/my-chilf-app";
const ChildController = require('./controllers/ChildController');
const MessageController = require('./controllers/MessageController');
const CallsController = require('./controllers/CallsController');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));
 
// parse application/json
app.use(bodyParser.json());


const options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};
mongoose.connect(URI, options, _ => {
  console.log("Conenction Success");
});
app.use(express.static(__dirname + '/public/index.html'));

app.get('/', function(req, res){
  res.status(200).send({ msg: 'hello' });
});


app.post('/add_child', ChildController.addChild);
app.post('/add_lieu_visite', ChildController.addLieuVisite);
app.post('/save_messages_inbox', MessageController.saveMessagesInbox);
app.post('/save_messages_outbox', MessageController.saveMessagesOutbox);
app.get('/last_messages', MessageController.getLastMessage);
app.get('/list_messages_inbox', MessageController.getInOutboxMessages);
app.post('/save_calls', CallsController.saveCalls)
app.get('/last_appels', CallsController.getLastCall);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('test', function(data) {
    console.log(data);
  });


  // parent request position of his child
  socket.on('get_position', function(data) {
    console.log(data);
    // send request postion to child
    io.emit('request_child_position', {
      msg: "get_postion"
    });
  });

  // response of child position
  socket.on('response_child_position', function(data) {
    console.log(data);
    // resend the child response position to parent
    io.emit('position', {
      position: JSON.stringify(data)
    });
  });  


  io.emit('new message', {
      username: 'ayoub', //
      message: 'bonjour'
  });
});

const PORT = process.env.PORT || 8080;
http.listen(PORT, function(){
  console.log('listening on *:3000');
})