const ChildModel = require('../model/child');
const LieuVisiteModel = require('../model/lieuVisite');
const axios = require('axios');
const _ = require('underscore');
var async = require("async");

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

exports.saveMessages = function(req, res, next){
    const messages = req.body;
    console.log(messages);
    return res.status(200).send(messages);
}

exports.addLieuVisite = function(req, res, next) {
    const data =  req.body;
    console.log(data.data);
    const KEY = 'AIzaSyBYoN-3I8bWS9YqmojgiTnByDQd2LZ35fY';
    var configs = {};
    async.forEachOf([{"date":"1530142458768","numero":"key_06272018005709","latitude":"-7.62329","longitude":"33.5885"}], (value, key, callback) => {
        console.log('VALUE', value);
        console.log('kEY', key);
        let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${value.longitude},${value.latitude}&radius=1&key=${KEY}`;
        console.log('URL', url);
        axios.get(url).then(function(d){
            try {                
                configs[key] = JSON.parse(d);
            } catch (e) {
                return callback(e);
            }
            callback(); //
        })
    }, err => {
        if (err) console.error(err.message);
        // configs is now a map of JSON data
        console.log('Config', configs);
        return res.status(200).send(configs);
    });

    

  /*  if(data) {        

        const lieuVisite = new LieuVisiteModel(data);
        lieuVisite.save(function(err, lieu) {
            if(!err) {
               return  res.status(200).send(lieu);
            }

            return res.status(401).send({ err: err });
        });
    } */   
}

