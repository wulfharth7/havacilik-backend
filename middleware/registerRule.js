const {RulesModel}= require("../schemas/rule.model")

const checkForNewMemberRule = async function(){
    const memberRule = await RulesModel.findOne({_id: "628364d4be8eac6ef28cd210"});
    console.log(memberRule)
    console.log(memberRule["NewMemberRegister"])
    if(memberRule["NewMemberRegister"] === true){
        return 1
    }else{
        return 0
    }
}

module.exports = checkForNewMemberRule;