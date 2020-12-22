

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

const io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('a user connected');
});


// Web UI
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

io.on('connection', function(socket) {
  socket.on('chat message', (text) => {
    console.log('Message From User: ' + text);
    var reply;
    if(text=="hello")
    reply="Hi";
    else if(text=="how are you")
    reply="I'm fine";
    else if(text=="f y p")
    reply="Tm se na ho paye ga :D";
    else
    reply="Sorry, What did you say ?"+text+"#";
    //Vanilla javascript
    // Get a reply from API.ai
    socket.emit('bot reply', reply);
   

  });
});
