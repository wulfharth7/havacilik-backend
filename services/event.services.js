var {EventModel} = require('../schemas/event.model')


exports.CreateEvent = async function(query){
    const event = new EventModel(query);
    try {
      await event.save();
      return event
    } catch (error){
        throw Error('An error occured')
    }
}

exports.GetAllEvents = async function(query){
    try {
        const events = await EventModel.find({});
        return events
    } catch (error) {
        throw Error('An error occured')
    }
}

exports.FindSpecificEvent = async function(query){
    const events = await EventModel.findOne({_id: query});
    try {
        return events
    } catch (error) {
        throw Error('An error occured')
    }
}

exports.EventUpdate = async function(query){
    try{}catch{}
}

exports.EventDelete = async function(query){
    EventModel.findOneAndDelete({_id: query}, (err,result) => {
  
        if(err){
            console.log("Error",err);
        }
        else{
            //res.send("done");
            return(1)
            //console.log(result + " - " + req.params.id);
        }
    })
}

exports.EventParticipants = async function(query){
    const event = await EventModel.findOne({_id: query}).select("Participants");
  try{
    return event
    //res.send(event);
  }catch{
    //res.status(500).send(event);
    throw Error('An error occured')
  }
}