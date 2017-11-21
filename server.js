const express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var port = process.env.PORT || 3000;

app.use('/css',express.static(__dirname + '/public/css'));
app.use('/js',express.static(__dirname + '/public/js'));
app.use('/assets',express.static(__dirname + '/public/assets'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/public/index.html');
});

server.listen(port, () => {
    console.log('Server listening on port 3000');
});