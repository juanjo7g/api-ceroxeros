console.log('Inició el API');

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var config = require("../config");

var app = express();

var PUERTO = process.env.PORT || 8080;
var URL_DB = config.mongodb.URL;

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(URL_DB, function(err, res) {
  if(err) {
    return console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(PUERTO, function(){
        console.log('Escuchando en el puerto ' + PUERTO);
    });
});

app.use('/',require('./routes'));
