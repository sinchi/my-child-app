var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LieuVisiteShema = new Schema(
  {
    idLieuVisite: {type: String, required: true},
    date : {type: Date, required: true},
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
module.exports = mongoose.model('LieuVisite', LieuVisiteShema);