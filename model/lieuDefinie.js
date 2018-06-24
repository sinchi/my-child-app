var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LieuDefinieShema = new Schema(
  {
    idLieuDefinie: {type: String, required: true},
    pseudo : {type: String, required: true},
    latitude : {type: String, required: true},
    longitude : {type: String, required: true}
  }
);

// Virtual for child's URL
/*ChildShema
.virtual('url')
.get(function () {
  return '/api/child/' + this._id;
});*/

//Export model
module.exports = mongoose.model('LieuDefinie', LieuDefinieShema);