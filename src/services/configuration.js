var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// Modelo
var Configuration = require('../models/configuration.js');
var User = require('../models/user.js');

var routes = require('../routes');
var user_id = '';

router.get('/get', function (req, res){
  user_id = routes.user_id;
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
  console.log(req.body);
  var name = req.body.name;
  var mode = req.body.mode;
  var intensity = req.body.intensity;
  var token = req.body.token;
  var user_id;

  if (token == undefined || token == ''){
    return res.status(401).json({ success: false, data: "ERROR token invalido"});
  }

  User.findOne({token: token}, function(err, data) {
    if (err) {
		  return res.status(500).json({ success: false, data: err.message});
		}
    if (data == null) {
      return res.status(401).json({ success: false, data: "ERROR token invalido"});
    }
    user_id = data._id;

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
});

router.delete('/delete', function (req, res){
});
// getAll,put, delete, update ....

module.exports = router;
