var eventService = require('../services/event.services')
var verify = require('../middleware/verify')

exports.CreateEvent = async function(req,res){
    try{
        var event = await eventService.CreateEvent(req.body)
        res.send(event);
    }catch(error){
        res.status(500).send(error);
    }
}

exports.GetAllEvents = async function(req,res){
    var event = await eventService.GetAllEvents({})
    try{ 
        return verify(req,res,event)
    }catch(error){
            res.status(500).send(error);
        }
}

exports.FindSpecificEvent = async function(req,res,paramV){
    try{
        var event = await eventService.FindSpecificEvent(paramV);
        res.send(event);
    }catch{
        res.status(500).send(error);
    }
}

exports.EventUpdate = async function(req,res){
    try{}catch{}
}

exports.EventDelete = async function(req,res,paramV){
    try{
        var event = await eventService.EventDelete(paramV);
        res.status(200).send(event);
    }catch{
        return -1
    }
}

exports.EventParticipants = async function(req,res,paramV){
    try{
        var event = await eventService.EventParticipants(paramV);
        res.send(event);
    }catch{
        
    }
}