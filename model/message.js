var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageShema = new Schema(
  {
    idMessage: {type: String, required: true},
    date: {type: Date, required: true},
    numero: {type: Number, required: true},
    message: {type: String, required: true}

  }
);

// Virtual for child's URL
/*ChildShema
.virtual('url')
.get(function () {
  return '/api/child/' + this._id;
});*/

//Export model
module.exports = mongoose.model('Appel', MessageShema);