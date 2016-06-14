var mongoose = require('mongoose')
var Schema   = mongoose.Schema;

var qualificationSchema = new Schema({
  quantity:   { type: Number },
  mode:       { type: String },
  intensity:  { type: Number },
  feedback:   { type: String },
});

module.exports = mongoose.model('Qualification', qualificationSchema);
