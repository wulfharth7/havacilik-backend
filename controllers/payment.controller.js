const res = require('express/lib/response');
var PaymentService = require('../services/payment.services')
var verify = require('../middleware/verify')

exports.AddPayment = async function (req,res){
    try{
        var payment = await PaymentService.AddPayment(req.body)
        res.send(payment);
    }catch{
        res.status(500).send(error);
    }
}

exports.DeletePayment = async function (req,res,paramV){
    var payment = await PaymentService.DeletePayment(paramV)
    try{
        res.send(payment)
    }catch{res.send(payment)}
}

exports.UpdatePayment = async function (req,res){
    try{}catch{}
}

exports.GetAllPayments = async function (req,res){
    var payment = await PaymentService.GetAllPayments({})
    try{
        return verify(req,res,payment)
    }catch{return verify(req,res,payment)}
}

exports.GetSpecificPayment = async function (req,res,paramV){
    try{
        var payment = await PaymentService.GetSpecificPayment(paramV)
        res.send(payment);
    }catch{response.status(500).send(error);}
}

exports.GetPeopleInDebt = async function (req,res,paramV){
    var payment = await PaymentService.GetPeopleInDebt(paramV)
    try{
        res.send(payment);
    }catch{res.status(500).send(payment);}
}
