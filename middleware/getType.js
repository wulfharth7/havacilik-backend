var {InvitationModel} = require('../schemas/invitation.model')
var {UserModel} = require('../schemas/user.model')
var changeAmount = require('../middleware/invitationAmount')
var firstLetterUppercaseForName = require('../middleware/nameStructure')
var firstLetterUpperCaseforSurname = require('../middleware/surnameStructure')
//the function helps us to get the type of the invitations when registering
const getType = async function(query,invName){

        const invitations = await InvitationModel.findOne({SpecialCode: invName}).select("Type");
        const name = JSON.stringify(query.body["Name"]).slice(1);
        const words = name.split(" ").slice(0, name.length -1)
        for(var i = 0; i<words.length;i++){
                words[i] = words[i].charAt(0).toUpperCase()+ words[i].slice(1);
        }
        const bigName = words.toString().replace(","," ").replace(",", " ");
        const bigSurname = JSON.stringify(query.body["Surname"]).toUpperCase().slice(1);
        const update = {Type: invitations["Type"], Surname: bigSurname.slice(0, bigSurname.length - 1),Name: bigName.slice(0, bigName.length -1)} //37 38 yaptim, burayi duzelticem, basta ve sonda tirnak isaretleri oluyordu ben de siliverdim. ayrica kodu okunabilir olsun diye fazladan middleware koymak lazim buraya. suanlik boyle dursun
        const filter = {Email: query.body["Email"]} 
        const updatedDocument = await UserModel.findOneAndUpdate(filter, update, { new: true });
        return changeAmount(invName,updatedDocument)
}
module.exports = getType;