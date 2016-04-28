var express = require('express');
var router = express.Router();

router.use('/api/root',require('./services/root'));
router.use('/api/item',require('./services/item'));

module.exports = router;
