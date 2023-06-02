var {PaymentModel} = require('../schemas/payment.model')

exports.AddPayment = async function (query){
    const payment = new PaymentModel(query);
    try {
      await payment.save();
      return payment
    } catch (error){
        throw Error('An error occurred')
    }
}

exports.DeletePayment = async function (query){
    PaymentModel.findOneAndDelete({_id: query}, (err,result) => {

        if(err){
            console.log("Error",err);return(-1)
        }
        else{
            return(1)
            //res.send("done");
            console.log(result + " - " + req.params.id);
        }
    })
}

exports.UpdatePayment = async function (query, page, limit){
    try{}catch{}
}

exports.GetAllPayments = async function (query){
    const payments = await PaymentModel.find({});

    try {
      return payments
    } catch (error) {
        throw Error('An error occurred')
    }
}

exports.GetSpecificPayment = async function (query){
    const users = await PaymentModel.findOne({_id: query});
    try {
        return users
    } catch (error) {
      throw Error('An error occurred')
    }
}

exports.GetPeopleInDebt = async function (query){
    const payment = await PaymentModel.findOne({_id: query}).select("PeopleInDebt");
    try{
      return payment
    }catch{
      throw Error('An error occurred')
    }
}


