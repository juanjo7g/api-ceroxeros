var mongoose = require('mongoose')
var Schema   = mongoose.Schema;

var configurationSchema = new Schema({
  name:       { type: String },
  mode:       { type: String },
  intensity:  { type: Number },
  date:       { type: Date, default: Date.now },
  user_id:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Configuration', configurationSchema);
