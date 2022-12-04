const file = require("../utils/import");
let input = file.getInput(4).split("\n");
//let input = file.getSample("sample.txt").split("\r\n");

function createNumbers(min, max){
    let arr = [];
    min = Number(min);
    max = Number(max);
    for(let i=Number(min); i<=max; i++){
        arr.push(i);
    }
    return arr;
}

function anyOverlap(arr1, arr2){
    for(let i=0; i<arr2.length; i++){
        if(arr1.includes(arr2[i])){
            return true;
        }
    }
    return false;
}

let count = 0;
let count2 = 0;

for(let i=0; i<input.length; i++){
    if(input[i]=="")
        break;
    let cur = input[i].split(",");
    let num1 = cur[0].split("-");
    let num2 = cur[1].split("-");
    let first = createNumbers(num1[0],num1[1]);
    let second = createNumbers(num2[0],num2[1]);
    //part 1;
    if(first.every(elem => second.includes(elem)) || second.every(elem => first.includes(elem))){
        count++;
    }
    //Part 2;
    if(anyOverlap(first,second)){
        count2++;
    }
    
}

console.log("Part 1: ", count);
console.log("Part 2: ", count2);