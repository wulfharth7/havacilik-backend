const mongoose = require("mongoose");

const ruleSchema = new mongoose.Schema({
        EventStartDate: {type:String, required: true},
        EventFinishDate:{type:String, required: true},
        EventStartHour:{type:String, required: true},
        EventFinishHour: {type:String, required: true},
        BeginnerPilotEventRegister: {type:Boolean, required: true},
        ActivePilotEventRegister: {type:Boolean, required: true},
        CanRegisterEvents: {type:Boolean, required: true},
        NewMemberRegister: {type:Boolean, required: true},  //done
        AutomaticEventCreate: {type:Boolean, required: true}//done
});


const RulesModel = mongoose.model("RulesModel", ruleSchema);
module.exports = {RulesModel}