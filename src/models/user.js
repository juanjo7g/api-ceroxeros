var mongoose = require('mongoose')
var Schema   = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String },
  password: { type: String },
  email:    { type: String },
  name:     { type: String },
  token:    { type: String },
  userFbId: { type: String }
});

module.exports = mongoose.model('User', userSchema);
