const file = require("../utils/import");
let input = file.getInput(3).split("\n");
//let input = file.getSample("sample.txt").split("\r\n");

function commonLetter(set, string1, string2=null){
    for(let i=0; i<string1.length; i++){
        if(set.has(string1[i])){
            if(string2==null){
                return string1[i];
            }else{ // Part 2
                let set1 = new Set(string2);
                if(set1.has(string1[i])){
                    return string1[i];
                }
            }
        }
    }
    return "?";
}

let count = 0;
let count2 = 0;

function codeFromLetter(letter){
    return letter.charCodeAt(0)-96>0 ? letter.charCodeAt(0)-96 : letter.charCodeAt(0)-38
}
for(let i=0; i<input.length; i++){
    if(input[i]=="")
        break;

    //part 1;
    let width=Math.floor(input[i].length/2);
    let set = new Set(input[i].substring(0,width));
    let common = commonLetter(set,input[i].substring(width, input[i].length));
    count+= codeFromLetter(common);

    //part 2;
    if(i%3==2){
        common = commonLetter(new Set(input[i]),input[i-1], input[i-2]);
        count2+= codeFromLetter(common);
    }
}

console.log("Part 1: ", count);
console.log("Part 2: ", count2);