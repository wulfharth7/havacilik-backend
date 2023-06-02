const res = require('express/lib/response');
var ruleService = require('../services/rule.services')

exports.AddRule = async function(req,res){
    try{
        var rule = await ruleService.AddRule(req.body)
        res.send(rule)
    }catch(error){
        res.status(500).send(error);
    }
}

exports.DeleteRule = async function(req,res,paramV){
    try{
        var rule = await ruleService.DeleteRule(paramV)
        res.send(rule)
    }catch(error){
        res.status(500).send(error);
    }
}

exports.UpdateRule = async function(req,res){
    try{

    }catch{

    }
}

exports.GetAllRules = async function(req,res){
    try{
        var rule = await ruleService.GetAllRules({})
        res.send(rule)
    }catch(error){
        res.status(500).send(error);
    }
}