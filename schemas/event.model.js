const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    Name: {type:String, required: true},
    Location: {type:String, required: true},
    Date: {type:Date, required: true},
    Deadline: {type:Date, required: true},
    MaximumParticipant: {type:Number, required: true},
    Participants:[{type:Object, required: true}]
});

const EventModel = mongoose.model("EventModel", eventSchema);
module.exports = {
    EventModel
}