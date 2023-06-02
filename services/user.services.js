var {UserModel} = require('../schemas/user.model')
var {InvitationModel} = require('../schemas/invitation.model')
var bcrypt = require("bcrypt");
var getTypeFromInv = require('../middleware/getType')
var checkForNewMemberRule = require('../middleware/registerRule')
const {createAutoEvents} = require('../middleware/createAutomaticEvents');

exports.AddUserWithoutRegister = async function(query){
    const user = new UserModel(query);
    try {
      await user.save();
      return user
    }catch (error){
        throw Error('Error while paginating Users')
    }
}

exports.UserRegister = async function(query,invitationCode){
  const canRegister = await checkForNewMemberRule();
  if(canRegister === 1){
    const userExists = await UserModel.exists({Email: query.body["Email"]});
    if(userExists){
    return userExists
  }else{
    const invExists = await InvitationModel.exists({SpecialCode: invitationCode});
    if(invExists){
      const newUser = new UserModel(query.body);
      const salt = await bcrypt.genSalt(10);
      newUser.Password = await bcrypt.hash(newUser.Password, salt)
      const invExists = await InvitationModel.findOne({SpecialCode: invitationCode});
      if(invExists["UsageAmount"] >= 0){
        await newUser.save();
        return await getTypeFromInv(query,invitationCode)
      }else{
        return -1
      }
    }else{
      return -1
    }
  }  
  }else{
    return -1
  }
}

exports.UserLogin = async function(query){
    try{  
        const user = await UserModel.findOne({Email: query.body["Email"]});
        const validPassword = await bcrypt.compare(query.body.Password, user.Password);
        if(validPassword){
          await createAutoEvents();
          return user["_id"]
        }else{
            return -1
        }
      }catch{
          return -1
      }
}

exports.getAllUsers = async function(query){
    try {
      const users = await UserModel.find({});
        return users
      } catch (error) {
          throw Error('An error occurred')
      }
}

exports.getSpecificUser = async function (query){
    const users = await UserModel.findOne({_id: query});
    try {
        return users
      } catch (error) {
        throw Error('An error occurred')
      }
}

exports.getAllUsersOfType = async function(query){
    const users = await UserModel.find({Type: query});
    try {
        return users
      } catch (error) {
        throw Error('An error occurred')
      }
}

exports.UserDelete = async function (query){
    UserModel.findOneAndDelete({_id: query}, (err,result) => {
        if(err){
            console.log("Error",err);
        }
        else{
            return(1)
        }
    })
}

exports.UserUpdate = async function(query){
    try{

    }catch{

    }
}

exports.resetPassword = async function(query){
  try{  
    const emailExists = await UserModel.exists({Email: query});
  }catch{
        return -1
  }
}


