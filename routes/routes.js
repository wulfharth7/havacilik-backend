const express = require("express");
const {UserModel}= require("../schemas/user.model")
const {InvitationModel}= require("../schemas/invitation.model")
const {PaymentModel}= require("../schemas/payment.model")
const {EventModel}= require("../schemas/event.model")
const {RulesModel}= require("../schemas/rule.model")
const {absenceCountMiddleware} = require("../middleware/absenceCheck")

var userController = require('../controllers/user.controllers');
var eventController = require('../controllers/event.controllers');
var paymentController = require('../controllers/payment.controller');
var InvitationController = require('../controllers/invitation.controller');
var ruleController = require('../controllers/rule.controller');
const auth = require("../middleware/auth");
const checkArrayForDuplicate = require("../middleware/checkDuplicateArray");

//to be clean coded later
var bcrypt = require("bcrypt");
var verify = require('../middleware/verify')
//to be clean coded later


const app = express.Router();
/**
 * 
 * GET product list.
 * @return product list |empty.
 */

app.get('/favicon.ico', (req, res) => res.status(204));
app.get("/",async (req, res) => {
  const message = "api for gazihavacilik.com "+
  "Barış Can Nazlıcan - Ahmet Ergül";
  res.send(message);
 });
 
app.post("/users/add",auth,userController.AddUserWithoutRegister);
app.post("/users/register/:invitationCode",async (req, res) => {
   userController.UserRegister(req,res,req.params.invitationCode)
});
app.post("/users/login",userController.UserLogin);
app.get("/users",auth, userController.getAllUsers);
app.get("/users/find/:id",auth, async(req, res) => {
  return userController.getSpecificUser(req,res,req.params.id);
});
app.get("/users/groupFind/:types",auth, async(req, res) => {
  return userController.getAllUsersOfType(req,res,req.params.types)
});
app.post("/users/absencecount/",auth, async(req,res) =>{
  await absenceCountMiddleware()
  res.send("absence count");
})
//to be clean coded later
app.post("/users/resetPassword",auth,async(req, res) => {
  var user = await UserModel.findOne({Email: req.body["Email"]});
  const salt = await bcrypt.genSalt(10);
  user.Password = await bcrypt.hash(req.body["Password"], salt);

  const update = {Password: user.Password
  } 
  const filter = {Email: req.body["Email"]} 
  const updatedDocument = await UserModel.findOneAndUpdate(filter, update, { new: true });

  return verify(req,res,updatedDocument)
});
//to be clean coded later

app.delete("/users/del/:id",auth,async(req, res) => { 
  return userController.UserDelete(req,res,req.params.id)
});
app.patch("/users/update/:id",auth, async (req, res) => {
  const update = {Type: req.body.Type, Name: req.body.Name, Surname: req.body.Surname, Email: req.body.Email, Height: req.body.Height, 
                  Weight: req.body.Weight, FlightCount: req.body.FlightCount, BloodType: req.body.BloodType, Sex: req.body.Sex, PhoneNum: req.body.PhoneNum,
                  Siv: req.body.Siv, Password: req.body.Password, Illness: req.body.Illness, Drugs: req.body.Drugs, Adresses: req.body.Adresses,
                  EmergencyPhoneNum: req.body.EmergencyPhoneNum, Emergency: req.body.Emergency, AbsenceCount: req.body.AbsenceCount
  } 
  const filter = {_id: req.params.id} 
  const updatedDocument = await UserModel.findOneAndUpdate(filter, update, { new: true });
 
  return res.status(200).send(updatedDocument);
});

app.post("/events/add",auth, eventController.CreateEvent);
app.get("/events",auth,eventController.GetAllEvents);
app.get("/events/find/:id",auth,async(req, res) => { 
  eventController.FindSpecificEvent(req,res,req.params.id)
});
app.delete("/events/del/:id", auth,async(req, res) => {
  eventController.EventDelete(req,res,req.params.id)
});
app.get("/events/participants/:eventID",auth, async(req, res) => {
  eventController.EventParticipants(req,res,req.params.eventID)
});
app.patch("/events/update/:id",auth, async (req, res) => {
    //write a middleware for this
    const event = await EventModel.findById({_id: req.params.id});
    const filteredParticipants = await checkArrayForDuplicate(req.body.Participants)
    console.log(filteredParticipants);
    
    const update = {Name: req.body.Name, Location: req.body.Location, Date: req.body.Date, Deadline: req.body.Deadline, MaximumParticipant:
    req.body.MaximumParticipant, Participants: filteredParticipants
    } 
    const filter = {_id: req.params.id} 
    const updatedDocument = await EventModel.findOneAndUpdate(filter, update, { new: true });
    return res.status(200).send(updatedDocument); 
});

app.post("/payments/add",auth, paymentController.AddPayment);
app.delete("/payments/del/:id", auth,async(req, res) => {
  paymentController.DeletePayment(req,res,req.params.id)
});
app.get("/payments",auth,paymentController.GetAllPayments);
app.get("/payments/find/:id",auth,async(req, res) => { 
  paymentController.GetSpecificPayment(req,res,req.params.id)
});
app.get("/payments/debts/:paymentID",auth,async (req, res) => { 
  paymentController.GetPeopleInDebt(req,res,req.params.paymentID)
});
app.patch("/payments/update/:id",auth, async (req, res) => {
  const update = {Name: req.body.Name, DeadLine: req.body.DeadLine, PaymentCategory: req.body.PaymentCategory, PaymentAmount: req.body.PaymentAmount,
    PeopleInDebt: req.body.PeopleInDebt
  } 
  const filter = {_id: req.params.id} 
  const updatedDocument = await PaymentModel.findOneAndUpdate(filter, update, { new: true });
  return res.status(200).send(updatedDocument);
});

app.post("/invitations/add",auth,InvitationController.AddInvitation);
app.delete("/invitations/del/:id",auth,async(req, res) => { 
  InvitationController.DeleteInvitation(req,res,req.params.id)
});
app.get("/invitations", auth,InvitationController.GetAllInvitations);
app.get("/invitations/find/:id",auth,async(req, res) => {
  InvitationController.GetSpecificInvitations(req,res,req.params.id)}
  );
app.patch("/invitations/update/:id",auth, async (req, res) => {
    const update = {Name: req.body.Name, SpecialCode: req.body.SpecialCode, Deadline:req.body.DeadLine, Type: req.body.Type, 
      UsageAmount: req.body.UsageAmount
    } 
    const filter = {_id: req.params.id} 
    const updatedDocument = await InvitationModel.findOneAndUpdate(filter, update, { new: true });
   
    return res.status(200).send(updatedDocument);
});

app.post("/rules/add", auth,ruleController.AddRule);
app.delete("/rules/del/:id",auth,async(req, res) => { 
  ruleController.DeleteRule(req,res,req.params.id)
});
app.patch("/rules/update/:id",auth, async (req, res) => {
  const update = {EventStartDate: req.body.EventStartDate, EventFinishDate: req.body.EventFinishDate, EventStartHour: req.body.EventStartHour,
    EventFinishHour: req.body.EventFinishHour, BeginnerPilotEventRegister: req.body.BeginnerPilotEventRegister, 
    ActivePilotEventRegister: req.body.ActivePilotEventRegister, CanRegisterEvents: req.body.CanRegisterEvents, 
    NewMemberRegister:req.body.NewMemberRegister, AutomaticEventCreate: req.body.AutomaticEventCreate
  } 
  const filter = {_id: req.params.id} 
  const updatedDocument = await RulesModel.findOneAndUpdate(filter, update, { new: true });
 
  return res.status(200).send(updatedDocument);
});
app.get("/rules", ruleController.GetAllRules);

module.exports = app;