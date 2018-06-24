var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HeurShema = new Schema(
  {
    idHeur: {type: String, required: true},
    heur : {type: Date, required: true}

  }
);

// Virtual for child's URL
/*ChildShema
.virtual('url')
.get(function () {
  return '/api/child/' + this._id;
});*/

//Export model
module.exports = mongoose.model('Heur', HeurShema);