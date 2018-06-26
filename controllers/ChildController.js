const ChildModel = require('../model/child');
const LieuVisiteModel = require('../model/lieuVisite');

exports.addChild = function(req, res, next){  

    const data = req.body;

  /*ChildModel.findByIdAndUpdate(id, { $set: { openfireNodeId: req.body.openfireNodeId }}, { new: true }, function (err, updatedUser) {
    if (err) return next(err);
    if(!updatedUser) return next(null, false);
    if(updatedUser.id != req.user._id) return res.status(401).send('Vous etes pas authorise');

    res.status(201).send(updatedUser);
  });*/

  res.status(200).send({ msg: "added with success " + JSON.stringify(data) });
}


exports.addLieuVisite = function(req, res, next) {
    const data =  req.body;

    if(data) {        
        const lieuVisite = new LieuVisiteModel(data);
        lieuVisite.save(function(err, lieu) {
            if(!err) {
               return  res.status(200).send(lieu);
            }

            res.status(401).send({ err: err });
        });
    }
    res.status(200).send(data);
}

