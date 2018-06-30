const ChildModel = require('../model/child');
const LieuVisiteModel = require('../model/lieuVisite');
const MessageModel = require('../model/message');
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

exports.saveMessagesInbox = function(req, res, next){
    const data = JSON.parse(req.body.data);
    console.log(data);
    console.log("SAVE Messages Inbox");
    async.forEachOf(data, (value, key, callback) => {        
        let message = new MessageModel({
            idEnfant: value.key,
            date: new Date(parseInt(value.date)),
            numero: value.numero,
            message_body: value.body,
            type_message: 'inbox'
        });
        console.log('message',message);
        
        message.save(function(err, newMessage) {
            if(err) return callback(err);
            console.log("NEW",newMessage);
            callback();
        })
    }, err => {
        if(err) console.error(err.message);        
        console.log('all messages are saved');      
        return res.status(200).send(data);  
    })        
}

exports.saveMessagesOutbox = function(req, res, next){
    const data = JSON.parse(req.body.data);
    console.log(data);
    console.log("SAVE Messages Outbox");
    async.forEachOf(data, (value, key, callback) => {
        let message = new MessageModel({
            idEnfant: value.key,
            date: new Date(parseInt(value.date)),
            numero: value.numero,
            message_body: value.body,
            type_message: 'outbox'
        });
        message.save(function(err) {
            if(!err) {
                console.log("MESSAGE SAVED");
                callback();
            }           
            else {
                return callback(err);
            } 
                
        })
    }, err => {
        if(err) console.error(err.message);        
        console.log('all messages are saved');      
        return res.status(200).send(data);  
    })        
}

/*exports.getLastMessage = function(req, res, next) {
    Message.find
}*/

exports.addLieuVisite = function(req, res, next) {
    const data =  req.body;
    console.log(data.data);
    const KEY = 'AIzaSyBYoN-3I8bWS9YqmojgiTnByDQd2LZ35fY';
    var configs = [];
    let names = [];
    async.forEachOf([
        {"date":"1530142458768","numero":"key_06272018005709","latitude":"-7.62329","longitude":"33.5885"},
        {"date":"1530142458768","numero":"key_06272018005709","latitude":"-7.516661","longitude":"33.588339"},
        {"date":"1530142458768","numero":"key_06272018005709","latitude":"-7.348290","longitude":"33.681891"}
    ], (value, key, callback) => {        
        let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${value.longitude},${value.latitude}&radius=1&key=${KEY}`;      
        axios.get(url).then(function(d){
            try {              
               // console.log("DDD", d.data); 
                let data = d.data; 
                let place = data.results[0];
              //  console.log("PLACE", place);
                names.push({
                    lieuVisite: place.name, 
                    date: new Date(parseInt(value.date)),
                    latitude: value.latitude,
                    longitude: value.longitude
                 });
                /*if (_.findWhere(names, place.name) == null) {
                    names.push({ name, new Date(parseInt(value.date)) });
                }*/
                configs.push(data);
            } catch (e) {
                return callback(e);
            }
            callback(); //
        })
    }, err => {
        if (err) console.error(err.message);
        // configs is now a map of JSON data
        console.log('Config', configs);
        async.forEachOf(names, (value, key, callback) => {
            let lieuVisite = new LieuVisiteModel(value);
            lieuVisite.save((err, lieu) => {
                if(!err) {
                    console.log("LIEU", lieu);
                    callback();
                }
                else return callback(err);
            })            
            

        }, err => {
            if(err) return callback(err);              
        })  
        
        return res.status(200).send({
            configs,
            names
        });
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

