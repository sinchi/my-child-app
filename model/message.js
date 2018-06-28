var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageShema = new Schema(
  {
    idEnfant: {type: String, required: true},
    date: {type: Date, required: true},
    numero: {type: String, required: true},
    message_body: {type: String, required: true},
    type_message: {type: String, required: true}

  }
);

// Virtual for child's URL
/*ChildShema
.virtual('url')
.get(function () {
  return '/api/child/' + this._id;
});*/

//Export model
module.exports = mongoose.model('Message', MessageShema);