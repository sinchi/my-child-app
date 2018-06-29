const AppelModel = require('../model/appel');
const axios = require('axios');
const _ = require('underscore');
var async = require("async");

/**
 * numero: {type: Number, required: true},    
    key: { type: String, required: true },
    call_type: { type: String, required: true },
    call_date: { type: Date },
    call_duration: { type: String, required: true }
 */

exports.saveCalls = function(req, res, next){
    const data = JSON.parse(req.body.data);
    console.log(data);
    console.log("SAVE Calls");
    return res.status(200).send(data);
  /*  async.forEachOf(data, (value, key, callback) => {        
        let call = new AppelModel({
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
    })  */      
}


