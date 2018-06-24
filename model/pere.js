var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PereShema = new Schema(
  {
    idPere: {type: String, required: true},
    numero: {type: String, required: true},
    password: {type: String, required: true},
    idChild: {type: String, required: true}

  }
);

// Virtual for child's URL
/*ChildShema
.virtual('url')
.get(function () {
  return '/api/child/' + this._id;
});*/

//Export model
module.exports = mongoose.model('Pere', PereShema);