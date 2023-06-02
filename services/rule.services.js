var {RulesModel} = require('../schemas/rule.model')

exports.AddRule = async function(query){
    const rule = new RulesModel(query);
  try {
    await rule.save();
    return rule
  } catch (error){
    return(-1)
  }
}

exports.DeleteRule = async function(query){
    RulesModel.findOneAndDelete({_id: query}, (err,result) => {
        if(err){
            console.log("Error",err);
        }
        else{
            return(-1)
            console.log(result + " - " + req.params.id);
        }
    })
}

exports.UpdateRule = async function(query){
    try{

    }catch{

    }
}

exports.GetAllRules = async function(query){
    const rules = await RulesModel.find({});
  try {
    //response.send(rules);
    return rules
  } catch (error) {
   // response.status(500).send(error);
  }
}