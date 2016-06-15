var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// Modelo
var Qualification = require('../models/qualification.js');

router.post('/post', function (req, res){
  var mode = req.body.mode;
  var intensity = req.body.intensity;
  var quantity = req.body.quantity;
  var feedback = req.body.feedback;

  if (mode == undefined || mode == '') {
    return res.status(400).json({ success: false, data: 'Modo invalido'});
  }
  if (intensity == undefined || intensity == '') {
    return res.status(400).json({ success: false, data: 'Intensidad invalida'});
  }
  if (quantity == undefined || quantity == '') {
    return res.status(400).json({ success: false, data: 'Cantidad invalida'});
  }
  var qualification = new Qualification({
    mode: mode,
    intensity: intensity,
    quantity: quantity,
    feedback: feedback
  });
  qualification.save(function(err, data) {
      if(err) {
        return res.status(500).json({ success: false, data: err.message});
      }
    res.status(200).json({success: true, data: data});
  });
});

router.get('/getAll', function (req, res){
  Qualification.find({}, function(error, data){
    if(error) {
      return res.status(500).json({ success: false, data: err.message});
    }
    res.status(200).json(data);
  });
});

module.exports = router;
