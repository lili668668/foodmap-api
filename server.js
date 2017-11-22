var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');
var cc = require('config-multipaas');
var knex = require('knex');
var bookshelf = require('bookshelf');

const dbName = 'foodmap.db';

var app = express(); 
var server = http.createServer(app);
var config = cc();
var dbFile = __dirname + "/" + dbName;
var db = bookshelf(knex({
    client: 'sqlite3',
    connection: {filename: dbFile}
}));

var restaurant = db.Model.extend({
    tableName: 'restaurant'
},{
    selectAll: function() {
        return this.forge().fetchAll();
    }
});

app.use( bodyparser.json() );
app.use( bodyparser.urlencoded({
    extended: true
}) );

app.get("/", function(request, response){
    response.send("test OK");
});

app.get('/all_restaurant', function(request,response){
    restaurant.selectAll().then(function(res){
        var send = {"restaurant" : res};
        response.send(send);
    });
});

server.listen(config.get('PORT'), config.get('IP'), function () {
    console.log( "Listening on " + config.get('IP') + ", port " + config.get('PORT')  )
});

