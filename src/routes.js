var express = require('express');
var router = express.Router();

router.get('*', function(req, res, next) {
  if (req.query.tkn == 123) {
    res.status(401).json({ success: false, data: "ERROR token invalido"});
  }else{
    next();
  }
});

router.post('*', function(req, res, next) {
  if (req.body.tkn == 123) {
    res.status(401).json({ success: false, data: "ERROR token invalido"});
  }else{
    next();
  }
});

router.use('/api/v1/user',require('./services/user'));
router.use('/api/v1/configuration',require('./services/configuration'));

module.exports = router;
