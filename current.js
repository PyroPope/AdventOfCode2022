const file = require("./utils/import");
const _ = require('./utils/customAssert');
const util = require("./utils/utility");
//.slice(0,-1);
let input = file.getText(3).split("\n");
//let input = file.getSample("sample.txt").split("\r\n")
//let input = text.split("\r\n");
//let numbers = input.map(x=>Number(x));

let currentp1 = 0;
let currentp2 = 0;
for(let i=0; i<input.length; i++){
    if(input[i]=="")
        break;
}

console.log("Part 1: ", currentp1);
console.log("Part 2: ", currentp2);