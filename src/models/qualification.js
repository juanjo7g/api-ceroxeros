var mongoose = require('mongoose')
var Schema   = mongoose.Schema;

var qualificationSchema = new Schema({
  ratings:    [ Number ],
  mode:       { type: String },
  intensity:  { type: Number },
  feedbacks:  [ String ],
  average:    { type: Number }
});

module.exports = mongoose.model('Qualification', qualificationSchema);
