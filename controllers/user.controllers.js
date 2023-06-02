var UserService = require('../services/user.services')  
var verify = require('../middleware/verify')
const jwt = require('jsonwebtoken');
const {absenceCountMiddleware} = require('../middleware/absenceCheck');

exports.AddUserWithoutRegister = async function(req,res){
    try{
        var users = await UserService.AddUserWithoutRegister(req.body)
        res.send(users);
    }catch(Error){
        res.status(500).send(Error)
    }
}

exports.UserRegister = async function(req,res,paramV){
    try{
        var user = await UserService.UserRegister(req,paramV);
        res.status(200).send(user);
    }catch(error){
        res.status(500).send(error);
        console.log(error);
    }
}
exports.UserLogin = async function(req,res){
    try{
        var id = await UserService.UserLogin(req)
        if(id !== -1){
            jwt.sign({id}, process.env.TOKEN_KEY, { expiresIn: '2h' }, (err, token) => {
                res.json({
                  token,id
                });
              });  
        }else{
            res.send(-1)
        }
    }catch(Error){
        res.status(500).send(Error)
    }
}

exports.getAllUsers = async function(req,res){
    try{
        var users = await UserService.getAllUsers({});
        return verify(req,res,users)
          
    }catch(Error){
        res.status(500).send(Error);
    }
}

exports.getSpecificUser = async function (req,res,paramV){
    try{
        var user = await UserService.getSpecificUser(paramV)
        return verify(req,res,user)
    }catch(Error){
        res.status(500).send(Error);
    }
}

exports.getAllUsersOfType = async function(req,res,paramV){
    try{
        var users = await UserService.getAllUsersOfType(paramV)
        return verify(req,res,users)
    }catch(error){
        res.status(500).send(error);
    }
}

exports.UserDelete = async function (req, res,paramV){
    try{
        var user = UserService.UserDelete(paramV)
        return verify(req,res,user)
    }catch{
        res.send(user)
    }
}

exports.resetpassword = async function(req,res,paramV){
    try{
        var resetpasswordURL = await UserService.resetPassword(paramV)
        res.send(resetpasswordURL);
    }catch(Error){
        res.status(500).send(Error)
    }
}

//update here

//