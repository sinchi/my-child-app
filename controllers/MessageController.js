const MessageModel = require('../model/message');
const axios = require('axios');
const _ = require('underscore');
var async = require("async");

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
    console.log("SAVE Messages Inbox");
    async.forEachOf(data, (value, key, callback) => {        
        let message = new MessageModel({
            idEnfant: value.key,
            date: new Date(parseInt(value.date)),
            numero: value.numero,
            message_body: value.body,
            type_message: 'outbox'
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


exports.getLastMessage = function(req, res, next) {
    MessageModel.findOne({type_message: 'inbox'}, {}, { sort: { 'date' : -1 } }, function(err1, inboxMessage) {
        if(!err1) {
            MessageModel.findOne({type_message: 'outbox'}, {}, { sort: { 'date' : -1 } }, function(err2, outboxMessage) {
                if(!err2 && outboxMessage && inboxMessage) {                        
                    res.status(200).send(
                         [ 
                            Object.assign({}, {...inboxMessage._doc, datetime: new Date(inboxMessage.date).getTime()}), 
                            Object.assign({}, {...outboxMessage._doc, datetime: new Date(outboxMessage.date).getTime()})
                         ]
                        );
                }else {
                    res.status(404).send({ msg: 'no messages' })
                }
              });
        }
      });
}

exports.getInOutboxMessages =  function(req, res, next) {
    MessageModel.find({}, {}, { sort: { 'date' : -1 } }, function(err, messages) {
        if(!err) {
            res.status(200).send(messages);
        }
      });
    }

exports.saveCalls = function(req, res, next) {
    console.log(req.body);
    return res.status(200).send(req.body);    
}


