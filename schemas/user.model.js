const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Name: {type:String, required: true},
    Surname:{type:String, required: true},
    Email: {type:String, required: true},
    Birth: {type:Date,required: true},
    AbsenceCount: {type:Number, required:false},
    Height: {type:Number, required:true},
    Weight: {type:Number, required:true},
    FlightCount:{type:Number, required:false},
    BloodType: {type:String, required: false},
    Sex: {type:String, required: true},
    PhoneNum: {type:String, required: true},
    Siv: {type:Boolean, required: false},
    Type: {type:String, required: false},
    Password: {type:String, required: true},
    Illness: [{type:Object, required: false}],
    Drugs: [{type:Object, required: false}],
    Adresses: [{type:Object, required: false}],
    EmergencyName: [{type:String, required: false}],
    emergencyPhoneNum: [{type:String, required: false}],
    Emergency: [{type:Object, required: false}]
}
);

const UserModel = mongoose.model("UserModel", UserSchema);
module.exports = {UserModel}