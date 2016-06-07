var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// Modelo
var Configuration = require('../models/configuration.js');
var User = require('../models/user.js');

var routes = require('../routes');
var user_id = '';

router.get('/get', function (req, res){
  user_id = routes.user_id_get; // Se obtiene un id de usuario valido si el token es correcto.
  Configuration.find({user_id: user_id}, function(err, data) {
    if (err) {
          return res.status(500).json({ success: false, data: err.message});
        }
    if (data == null) {
      return res.status(401).json({ success: false, data: "Usuario sin configurations"});
    }
    return res.status(200).json(data);
  });
});

router.post('/post', function (req, res){
  user_id = routes.user_id_post;

  var name = req.body.name;
  var mode = req.body.mode;
  var intensity = req.body.intensity;

  if (mode == undefined || mode == '') {
    return res.status(400).json({ success: false, data: 'Modo invalido'});
  }
  if (intensity == undefined || intensity == '') {
    return res.status(400).json({ success: false, data: 'Intensidad invalida'});
  }
  var configuration = new Configuration({
    name: name,
    mode: mode,
    intensity: intensity,
    user_id: user_id
  });
  configuration.save(function(err, data) {
      if(err) {
        return res.status(500).json({ success: false, data: err.message});
      }
    res.status(200).json({success: true, data: data});
  });
});

router.post('/delete', function (req, res){
  user_id = routes.user_id_post;
  var _id = req.body._id;

  Configuration.findOne({_id: _id}, function(err, data) {
    if (err) {
      return res.status(500).json({ success: false, data: err.message});
    }
    if (data == null) {
      return res.status(404).json({ success: false, data: "Configuracion no existe"});
    }
    Configuration.remove({ _id: _id }, function(err) {
      if (err) {
        return res.status(500).json({ success: false, data: err.message});
      }
      return res.status(200).json({ success: true, data : data });
    });
  });
});
// getAll,put, delete, update ....

module.exports = router;
