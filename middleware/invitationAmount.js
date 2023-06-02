const {InvitationModel} = require('../schemas/invitation.model')

const amount = async function(query,user){
    const invitation = await InvitationModel.findOne({SpecialCode: query});
    const amount = invitation["UsageAmount"]-1

    const update = {UsageAmount: amount } 
    const filter = {SpecialCode: query} 
    const updatedDocument = await InvitationModel.findOneAndUpdate(filter, update, { new: true });
    return user
}

module.exports = amount;