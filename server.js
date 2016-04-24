console.log('Inició el API');

var express = require('express');
var app = express();
var PUERTO = process.env.PORT || 8080;

app.listen(PUERTO, () =>{
  console.log('Escuchando en el puerto ' + PUERTO);
});

app.get('/', (req, res) => {
  res.send('Bienvenido a la raiz');
});
