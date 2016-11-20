var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');
var cc = require('config-multipaas');

var app = express(); 
var server = http.createServer(app);
var config = cc();

app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/img', express.static('img'));

app.use( bodyparser.json() );
app.use( bodyparser.urlencoded({
    extended: true
}) );

app.get('/', function(request,response){
    response.sendFile(__dirname + "/index.html");
});

server.listen(config.get('PORT'), config.get('IP'), function () {
    console.log( "Listening on " + config.get('IP') + ", port " + config.get('PORT')  )
});

