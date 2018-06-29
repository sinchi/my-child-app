var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AppelShema = new Schema(
  {    
   
    numero: {type: Number, required: true},    
    key: { type: String, required: true },
    call_type: { type: String, required: true },
    call_date: { type: Date },
    call_duration: { type: String, required: true }

  }
);

// Virtual for child's URL
/*ChildShema
.virtual('url')
.get(function () {
  return '/api/child/' + this._id;
});*/

//Export model
module.exports = mongoose.model('Appel', AppelShema);