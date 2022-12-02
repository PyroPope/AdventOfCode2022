const file = require("../utils/import");

let input = file.getInput(2).split("\n");

let sum = 0;
let elfs = [];
let count = 0;
for(let i=0; i<input.length; i++){
    if(input[i]==""){
        elfs[count] = sum;
        count++;
        sum=0;
    }else{
        sum+=Number(input[i]);
    }
}
console.log("Part 1: ", Math.max(...elfs));
elfs.sort();
elfs.reverse();
console.log("Part 2: ", elfs[0]+elfs[1]+elfs[2]);