var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ChildShema = new Schema(
  {
    idChild: {type: String, required: true},
    pseudo: {type: String, required: true},
    idLieuVisite: {type: String, required: true},
    idLieuDefinie: {type: String, required: true},
    idHeurDefinie: {type: String, required: true},
    idAppel: {type: String, required: true},
    idMessage: {type: String, required: true}

  }
);

// Virtual for child's URL
/*ChildShema
.virtual('url')
.get(function () {
  return '/api/child/' + this._id;
});*/

//Export model
module.exports = mongoose.model('Child', ChildShema);