var crypto = require('crypto');
var config = require('../config');
var key = config.api.KEY;

exports.generateToken = function(){
  return crypto.randomBytes(64).toString('hex');
}

exports.encrypt = function(text){
  var cipher = crypto.createCipher('aes-256-cbc', key)
  var crypted = cipher.update(text,'utf-8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

exports.decrypt = function(text){
  var decipher = crypto.createDecipher('aes-256-cbc', key)
  var dec = decipher.update(text,'hex','utf-8')
  dec += decipher.final('utf8');
  return decrypted;
}

exports.validarEmail = function(email) {
  return true;
}
