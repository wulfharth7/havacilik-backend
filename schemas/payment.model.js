const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    Name: {type:String, required: true},
    DeadLine: {type:Date, required: true},
    PaymentCategory:{type:String, required: true},
    PaymentAmount: {type:Number, required: true},
    PeopleInDebt:[{type:Object, required: true}]   
});


const PaymentModel = mongoose.model("PaymentModel", paymentSchema);
module.exports = {
    PaymentModel
}