var {InvitationModel} = require('../schemas/invitation.model')

exports.AddInvitation = async function (query){
    try{
        //request.body = query
        const inva = await InvitationModel.findOne({Name: query["Name"]}).select("Name -_id");
          if(inva.Name === query["Name"]){
            //response.send("-1");
            return (-1)
          }else{
            const inv = new InvitationModel(query);
            try {
              await inv.save();
              //response.send(inv);
              return inv
            } catch (error){
              //response.status(500).send(error);
            }
          }
          }catch{
            const inv = new InvitationModel(query);
            try {
              await inv.save();
              //response.send(inv);
              return inv
            } catch (error){
              //response.status(500).send(error);
              return (-1)
            }
          }  
}

exports.UpdateInvitation = async function (query){
    try{}catch{}
}

exports.DeleteInvitation = async function (query){
    //query= req.params.id
    InvitationModel.findOneAndDelete({_id: query}, (err,result) => {
        if(err){
            console.log("Error",err);
        }
        else{
            //res.send("done");
            return(1)
        }
    })
}

exports.GetAllInvitations = async function (query){
    const invitations = await InvitationModel.find({});

    try {
      //response.send(invitations);
        return invitations
    } catch (error) {
      //response.status(500).send(error);
      return(1)

    }
}

exports.GetSpecificInvitations = async function (query){
    //query = 
    const users = await InvitationModel.findOne({_id: query});

    try {
      //response.send(users);
      return users
    } catch (error) {
      //response.status(500).send(error);
      return(1)
    }
}

