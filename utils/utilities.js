function anyOverlap(arr1, arr2){
    for(let i=0; i<arr2.length; i++){
        if(arr1.includes(arr2[i])){
            return true;
        }
    }
    return false;
}

function createNumberArray(min, max){
    let arr = [];
    min = Number(min);
    max = Number(max);
    for(let i=Number(min); i<=max; i++){
        arr.push(i);
    }
    return arr;
}

exports.anyOverlap = anyOverlap;
exports.createNumberArray = createNumberArray;