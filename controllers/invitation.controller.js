const res = require('express/lib/response')
var InvitationService = require('../services/invitation.services')
var verify = require('../middleware/verify')

exports.AddInvitation = async function (req,res){
    var inv = await InvitationService.AddInvitation(req.body)
    try{
        res.send(inv)
    }catch{res.send(inv)}
}

exports.UpdateInvitation = async function (req,res){
    try{}catch{}
}

exports.DeleteInvitation = async function (req,res,paramV){
    var inv = await InvitationService.DeleteInvitation(paramV)
    try{
        res.send(inv)
    }catch{res.send(inv)}
}

exports.GetAllInvitations = async function (req,res){
    var inv = await InvitationService.GetAllInvitations({})
    try{
        return verify(req,res,inv)
    }catch{return verify(req,res,inv)}
}

exports.GetSpecificInvitations = async function (req,res,paramV){
    var inv = await InvitationService.GetSpecificInvitations(paramV)
     try{
        res.send(inv)
     }catch{res.send(inv)}
}

