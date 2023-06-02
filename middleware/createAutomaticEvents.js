const {EventModel} = require('../schemas/event.model');
const {RulesModel} = require('../schemas/rule.model');
var eventService = require('../services/event.services')

const createAutoEvents = async function(){
    if(await checkRuleForAutoEvents() === 1){
        const eventAvailability = await checkIfEventExists();
            if(eventAvailability == null){
                const dayNumber = await checkDayForCreatingEvent();
                const date = new Date();
                if(dayNumber === 1){//monday
                    var date1 = new Date(date);
                    date1.setDate(date.getDate()+5); 
                    const date2 = new Date(date);
                    date2.setDate(date.getDate()+4);
                    date2.setUTCHours(14,0,0,0);
                    const eventSaturday = {
                        "Name": "Haftalık Cumartesi Etkinliği",
                        "Location": "Ankara",
                        "Date": date1,
                        "Deadline": date2,
                        "MaximumParticipant": 20
                      }
                      var date3 = new Date(date);
                      date3.setDate(date.getDate()+6);
                      const eventSunday = {
                        "Name": "Haftalık Pazar Etkinliği",
                        "Location": "Ankara",
                        "Date": date3,
                        "Deadline": date2,
                        "MaximumParticipant": 20
                      }
                      await eventService.CreateEvent(eventSaturday);
                      await eventService.CreateEvent(eventSunday);
                }else if(dayNumber === 2){ //tuesday
                    var date1 = new Date(date);
                    date1.setDate(date.getDate()+4);
                    var date2 = new Date(date);
                    date2.setDate(date.getDate()+3);
                    date2.setUTCHours(14,0,0,0);
                    const eventSaturday = {
                        "Name": "Haftalık Cumartesi Etkinliği",
                        "Location": "Ankara",
                        "Date": date1,
                        "Deadline": date2,
                        "MaximumParticipant": 20
                      }
                      var date3 = new Date(date);
                      date3.setDate(date.getDate()+5);
                      const eventSunday = {
                        "Name": "Haftalık Pazar Etkinliği",
                        "Location": "Ankara",
                        "Date": date3,
                        "Deadline": date2,
                        "MaximumParticipant": 20
                      }
                      await eventService.CreateEvent(eventSaturday);
                      await eventService.CreateEvent(eventSunday);
                }else if(dayNumber === 3){
                    var date1 = new Date(date);
                    date1.setDate(date.getDate()+3);
                    var date2 = new Date(date);
                    date2.setDate(date.getDate()+2);
                    date2.setUTCHours(14,0,0,0);
                    const eventSaturday = {
                        "Name": "Haftalık Cumartesi Etkinliği",
                        "Location": "Ankara",
                        "Date": date1,
                        "Deadline": date2,
                        "MaximumParticipant": 20
                      }
                      var date3 = new Date(date);
                      date3.setDate(date.getDate()+4);
                      const eventSunday = {
                        "Name": "Haftalık Pazar Etkinliği",
                        "Location": "Ankara",
                        "Date": date3,
                        "Deadline": date2,
                        "MaximumParticipant": 20
                      }
                      await eventService.CreateEvent(eventSaturday);
                      await eventService.CreateEvent(eventSunday);
                }else if(dayNumber === 4){
                    var date1 = new Date(date);
                    date1.setDate(date.getDate()+2);
                    var date2 = new Date(date);
                    date2.setDate(date.getDate()+1);
                    date2.setUTCHours(14,0,0,0);
                    const eventSaturday = {
                        "Name": "Haftalık Cumartesi Etkinliği",
                        "Location": "Ankara",
                        "Date": date1,
                        "Deadline": date2,
                        "MaximumParticipant": 20
                      }
                      var date3 = new Date(date);
                      date3.setDate(date.getDate()+3);
                      const eventSunday = {
                        "Name": "Haftalık Pazar Etkinliği",
                        "Location": "Ankara",
                        "Date": date3,
                        "Deadline": date2,
                        "MaximumParticipant": 20
                      }
                      await eventService.CreateEvent(eventSaturday);
                      await eventService.CreateEvent(eventSunday);
                    }else if(dayNumber === 5){
                        var date1 = new Date(date);
                        date1.setDate(date.getDate()+1);
                        var date2 = new Date(date);
                        date2.setDate(date.getDate());
                        date2.setUTCHours(14,0,0,0);
                        const eventSaturday = {
                            "Name": "Haftalık Cumartesi Etkinliği",
                            "Location": "Ankara",
                            "Date": date1,
                            "Deadline": date2,
                            "MaximumParticipant": 20
                          }
                          var date3 = new Date(date);
                          date3.setDate(date.getDate()+2);
                          const eventSunday = {
                            "Name": "Haftalık Pazar Etkinliği",
                            "Location": "Ankara",
                            "Date": date3,
                            "Deadline": date2,
                            "MaximumParticipant": 20
                          }
                          await eventService.CreateEvent(eventSaturday);
                          await eventService.CreateEvent(eventSunday);
                        }

    }else{
        return 200
    }
    }else{
        return 200
    }
}

const checkDateAvailabilityForCreatingAutoEvent = async function(){
    const date = new Date();
    let day = date.getDay(); // 0=sunday.....6=saturday
    if(day === 1 || day === 2 || day === 3 || day === 4 ||day === 5){
        return 1
    }else{
        return 0
    }
}

const checkIfEventExists = async function(){
    const dateAvailability = await checkDateAvailabilityForCreatingAutoEvent();
    if(dateAvailability === 1){
        const event = await EventModel.exists({Name: "Haftalık Cumartesi Etkinliği"});
        if(event == null){
            return event
        }else{
            var date = new Date();
            var date3 = new Date(date);
            date3.setUTCDate(date.getUTCDate()+4);//if monday
            var date4 = new Date(date);
            date4.setUTCDate(date.getUTCDate()+3);//if tuesday
            var date5 = new Date(date);//if wed
            date5.setUTCDate(date.getUTCDate()+2);
            var date6 = new Date(date);//if thru
            date6.setUTCDate(date.getUTCDate()+1);
            var date7 = new Date(date);//if frida
            date7.setUTCDate(date.getUTCDate());
            date3.setUTCHours(14,0,0,0);
            date4.setUTCHours(14,0,0,0);
            date5.setUTCHours(14,0,0,0);
            date6.setUTCHours(14,0,0,0);
            date7.setUTCHours(14,0,0,0);

            if(date.getDay() == 1){
                const event1 = await EventModel.exists({Deadline: date3})
                if(event1 == null){
                    return null
                }
            }else if(date.getDay() == 2){
                const event1 = await EventModel.exists({Deadline: date4})
                if(event1 == null){
                    return null
                }
            }else if(date.getDay() == 3){
                const event1 = await EventModel.exists({Deadline: date5})
                if(event1 == null){
                    return null
                }
            }else if(date.getDay() == 4){
                const event1 = await EventModel.exists({Deadline: date6})
                if(event1 == null){
                    return null
                }
            }else if(date.getDay() == 5){
                const event1 = await EventModel.exists({Deadline: date7})
                if(event1 == null){
                    return null
                }
            }           
            return 0
        }
    }else{
        return 0
    }
}

const checkRuleForAutoEvents = async function(){
    const rule = await RulesModel.findById({_id: "628364d4be8eac6ef28cd210"}).select("AutomaticEventCreate")
    if(rule["AutomaticEventCreate"] === true){
        return 1
    }else{
        return 0
    }
}

const checkDayForCreatingEvent = async function(){
    const date = new Date();
    let day = date.getDay();// 0=sunday.....6=saturday
    return day
}



module.exports = { createAutoEvents, checkIfEventExists,checkRuleForAutoEvents,checkDayForCreatingEvent}

