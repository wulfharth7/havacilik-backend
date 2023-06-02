const checkArrayForDuplicate = async function checkDuplicate(arr){
    console.log(arr);
    let concatArray = arr.map(eachValue => {
        return Object.values(eachValue).join('')
      })
      let filterValues = arr.filter((value, index) => {
        return concatArray.indexOf(concatArray[index]) === index
    
      })
      console.log(filterValues)
    return filterValues;
}

module.exports = checkArrayForDuplicate;