
const firstLetterUpperCaseforSurname = async function(query){
    const bigSurname = JSON.stringify(query.body["Surname"]).toUpperCase().slice(1);
    return bigSurname
}

module.exports = firstLetterUpperCaseforSurname;
