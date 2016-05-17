var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Modelo

var User = require('../models/user.js');


router.get('/get', function (req, res){
  var id = req.query.username;
  res.status(200).json({ success: true, data: "Ok c:"});;
});

router.post('/post', function (req, res){
  console.log(req.body);
  var username = req.body.username;
  var password1 = req.body.password1;
  var password2 = req.body.pasword2;
  var email = req.body.email;
  var name = req.body.name;
  
  var user = new User ({
    username: username,
    password: password1,
    email: email,
    name: name,
  });
  
  user.save(function(err, data) {
		if(err) {
		  return res.status(500).json({ success: false, data: err.message});
		}
    res.status(200).json({success: true, data: data});
	});
});

module.exports = router;
