const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema({
        Name:{type:String, required: true},
        SpecialCode: {type:String, required: true},
        Deadline:{type:Date, required: true},
        Type: {type:String, required: true},
        UsageAmount:{type:Number, required: true}
});
const InvitationModel = mongoose.model("InvitationModel", invitationSchema);

module.exports = {
    InvitationModel
}