var express = require('express');
var router = express.Router();

// Modelo
var User = require('./models/user.js');

var user_id = '';
var token = '';

router.get('*', function(req, res, next) {
  if (req.path === '/api/v1/user/get') return next();
  token = req.query.token;
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
    exports.user_id = data._id;
    next();
  });
});

router.post('*', function(req, res, next) {
  if (req.body.token == 123) {
    res.status(401).json({ success: false, data: "ERROR token invalido"});
  }else{
    next();
  }
});

router.use('/api/v1/user',require('./services/user'));
router.use('/api/v1/configuration',require('./services/configuration'));

module.exports = router;
