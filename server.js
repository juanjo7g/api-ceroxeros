console.log('Inició el API');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var PUERTO = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));

app.listen(PUERTO, function(){
  console.log('Escuchando en el puerto ' + PUERTO);
});

app.use('/',require('./routes'));
