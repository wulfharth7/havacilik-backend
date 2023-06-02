
const firstLetterUppercaseForName = async function(query){
    const name = JSON.stringify(query.body["Name"]).slice(1);
        const words = name.split(" ").slice(0, name.length -1)
        for(var i = 0; i<words.length;i++){
                words[i] = words[i].charAt(0).toUpperCase()+ words[i].slice(1);
        }
        const bigName = words.toString().replace(","," ").replace(",", " ");
        return bigName;
}

module.exports = firstLetterUppercaseForName;
