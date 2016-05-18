var express = require('express');
var mongoose = require('mongoose');
var util = require('../util');

var router = express.Router();

// Modelo
var User = require('../models/user.js');

router.get('/get', function (req, res){
  var username = req.query.username;
  var password = req.query.password;

  if (username == undefined || username == '') {
    return res.status(401).json({ success: false, data: 'Usuario/Contraseña invalido'});
  }
  if (password == undefined || password == '') {
    return res.status(401).json({ success: false, data: 'Usuario/Contraseña invalido'});
  }

  User.findOne({ username: username}, function(err, data) {
    if(err) {
		  return res.status(500).json({ success: false, data: err.message});
		}
    if (data == null) {
      return res.status(401).json({ success: false, data: 'Usuario/Contraseña invalido'});
    }
    if (util.encrypt(password) != data.password) {
      return res.status(401).json({ success: false, data: 'Usuario/Contraseña invalido'});
    }
    res.status(200).json(data);
  });
});

router.post('/post', function (req, res){
  console.log(req.body);
  var username = req.body.username;
  var password1 = req.body.password1;
  var password2 = req.body.password2;
  var email = req.body.email;
  var name = req.body.name;
  var token = req.body.token;

  if (username == undefined || username == '') {
    return res.status(400).json({ success: false, data: 'Usuario invalido'});
  }
  if (password1 != password2) {
    return res.status(400).json({ success: false, data: 'Las contraseñas no coinciden'});
  }
  if (!util.validarEmail(email)) {
    return res.status(400).json({ success: false, data: 'Email invalido'});
  }
  //Todo: validar que el username no este repetido
  if (token == undefined || token == '') {
    token = util.generateToken();
  }
  var passwordEncrypt = util.encrypt(password1);

  var user = new User ({
    username: username,
    password: passwordEncrypt,
    email: email,
    name: name,
    token: token
  });

  user.save(function(err, data) {
		if(err) {
		  return res.status(500).json({ success: false, data: err.message});
		}
    res.status(200).json({success: true, data: data});
	});
});

module.exports = router;
