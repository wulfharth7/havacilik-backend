const {EventModel}= require("../schemas/event.model");
const {RulesModel}= require("../schemas/rule.model");
const {UserModel}= require("../schemas/user.model");
var UserService = require('../services/user.services')  

const checkDeadlineForEvents = async function(){
    const today = new Date();
    if(today.getDay() <= 5){
        const first = today.getDate() - today.getDay() + 1;
        const fifth = first + 4;
        const friday = new Date(today.setUTCDate(fifth));
        friday.setUTCHours(0,0,0,0)
        console.log(friday)
        return friday;
    }else if(today.getDay() == 6){
        const first = today.getDate()
        const fifth = first -1;
        const friday = new Date(today.setUTCDate(fifth));
        friday.setUTCHours(0,0,0,0)
        return friday;
    }else if(today.getDay() == 0){
        const first = today.getDate()
        const fifth = first -2;
        const friday = new Date(today.setUTCDate(fifth));
        friday.setUTCHours(0,0,0,0)
        return friday;
    }
}

const absenceCountMiddleware = async function(){
    const userIDList = await UserService.getAllUsers();
    var dataofIDS = Array.from(userIDList);
    var finalRes = dataofIDS.map(({_id}) => ({_id}));
    console.log(finalRes)

    for(var i = 0; i<finalRes.length;i++){
        queryID = finalRes[i]
        console.log(finalRes[i])
        const user = await UserModel.findById(queryID);
        const rule = await RulesModel.findById({_id: "628364d4be8eac6ef28cd210"}).select("BeginnerPilotEventRegister");
        const registerSituation = await checkIfRegisteredToEvent(user)
        if(rule["BeginnerPilotEventRegister"] === true){ //if the rule is turned off, the rule applies the same for everyone, which takes us to this if situation's else part.
            if(user.Type === "Başlangıç Pilotu"){
                if(registerSituation != "none"){
                    //update absence count to ++;
                    const userAbsenceCount = user.AbsenceCount
                    if(userAbsenceCount === undefined){
                        userAbsenceCount = 0
                    }else{
                        userAbsenceCount = userAbsenceCount+1;
                    }
                    await updateAbsenceCount(queryID,userAbsenceCount)
                }else{
                    //update absence count to 0
                    await updateAbsenceCount(queryID,0)
                }
            }else{
                await absenceCountDecider(registerSituation,queryID)
            }
        }else{
            await absenceCountDecider(registerSituation,queryID)
        }
    }
}

const absenceCountDecider = async function(registerSituation,userID){
    const user = await UserModel.findById(userID);
    if(registerSituation === "registered-to-all"){
        //update absence count to 0
        await updateAbsenceCount(userID,0)
    }else if(registerSituation === "registered-only-sat"){
        //update count to 1
        await updateAbsenceCount(userID,1)
    }else if(registerSituation === "registered-only-sun"){
        //frontend wont let this happen if your absence count is 3, so this can only happen for other instances. it'll set absence to 0
        await updateAbsenceCount(userID,0)
    }else{
        //registered to none, so it'll make absence count go 2 points higher.
        var userAbsenceCount = user["AbsenceCount"];
        if(user.AbsenceCount === undefined){
            userAbsenceCount = 0
        }else{
            userAbsenceCount = userAbsenceCount+2;
        }
         await updateAbsenceCount(userID,userAbsenceCount)
    }
}

const checkIfRegisteredToEvent = async function(user){
    const dateOfDeadline = await checkDeadlineForEvents()
    const eventSaturday = await EventModel.findOne({Deadline: dateOfDeadline, Name: "Haftalık Cumartesi Etkinliği"}).select("Participants");
    const eventSunday = await EventModel.findOne({Deadline: dateOfDeadline, Name: "Haftalık Pazar Etkinliği"}).select("Participants");
    const eventSat  = JSON.stringify(eventSaturday)
    const name ="\"Name\":"+ "\""+user.Name+" "+user.Surname+"\"";
    const eventSun = JSON.stringify(eventSunday);
    var searchSun = eventSun.search(name); //
    var searchSat = eventSat.search(name); // no white spaces between key value
    if(searchSun >= 0 && searchSat >= 0){//registered to all
        return "registered-to-all"
    }else if(searchSat >= 0 && searchSun === -1){ //registered to only saturday
        return "registered-only-sat"
    }else if(searchSat === -1 && searchSun >= 0){ //registered to only sunday
        return "registered-only-sun"
    }else{//not registered at all
        return "none"
    }
}

const updateAbsenceCount = async function(userID,absenceCount){
    const update = {AbsenceCount: absenceCount} 
    const filter = userID
    const updatedDocument = await UserModel.findOneAndUpdate(filter, update, { new: true });
    return userID;
}


module.exports = {checkDeadlineForEvents,checkIfRegisteredToEvent,absenceCountMiddleware}