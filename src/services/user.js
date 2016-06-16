var express = require('express');
var mongoose = require('mongoose');
var util = require('../util');

var router = express.Router();

// Modelo
var User = require('../models/user.js');

router.get('/login', function (req, res){
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

router.post('/loginFb', function (req, res){
  console.log(req.body);
  var email = req.body.email;
  var name = req.body.name;
  var token = req.body.token;
  var userFbId = req.body.userFbId;

  if (userFbId == undefined || userFbId == '') {
    return res.status(400).json({ success: false, data: 'userFbId invalido'});
  }
  if (token == undefined || token == '') {
    return res.status(400).json({ success: false, data: 'tokenFB invalido'});
  }
  if (!util.validarEmail(email)) {
    return res.status(400).json({ success: false, data: 'Email invalido'});
  }

  User.findOne({email: email}, function(err, userExisting) {
    if (err) {
      return res.status(500).json({ success: false, data: err.message});
    }
    if (userExisting != null) {
      userExisting.token = token;
      userExisting.userFbId = userFbId;
      userExisting.name = name;
      userExisting.save(function(err, data) {
    		if(err) {
    		  return res.status(500).json({ success: false, data: err.message});
    		}
        return res.status(200).json(data);
    	});
    } else {
      var user = new User ({
        email: email,
        name: name,
        token: token,
        userFbId : userFbId
      });
      user.save(function(err, data) {
    		if(err) {
    		  return res.status(500).json({ success: false, data: err.message});
    		}
        res.status(200).json(data);
    	});
    }
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

  if (name == undefined || name == '') {
    return res.status(400).json({ success: false, data: 'Nombre completo invalido'});
  }
  if (username == undefined || username == '') {
    return res.status(400).json({ success: false, data: 'Nombre de usuario invalido'});
  }
  if (!util.validarEmail(email)) {
    return res.status(400).json({ success: false, data: 'Email invalido'});
  }
  if (password1 == undefined || password1 == '' || password2 == undefined || password2 == '') {
    return res.status(400).json({ success: false, data: 'Contraseña invalida'});
  }
  if (password1 != password2) {
    return res.status(400).json({ success: false, data: 'Las contraseñas no coinciden'});
  }
  if (password1.length < 5) {
    return res.status(400).json({ success: false, data: 'Las contraseña debe ser de mínimo 5 caracteres'});
  }
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
  User.findOne({username: username}, function(err, data) {
    if (err) {
      return res.status(500).json({ success: false, data: err.message});
    }
    if (data != null) {
      return res.status(400).json({ success: false, data: "Usuario invalido"});
    }
    user.save(function(err, data) {
  		if(err) {
  		  return res.status(500).json({ success: false, data: err.message});
  		}
      res.status(200).json({success: true, data: data});
  	});
  });
});

module.exports = router;
