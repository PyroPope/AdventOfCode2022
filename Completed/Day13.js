const file = require("./utils/import");

let lines = file.getInput(13).split("\n");
//let lines = file.getSample("sample.txt").split("\r\n")
let pairs = [];
let allpackets = [];
let countp1 = 0;
let countp2 = 0;
for(let i=0; i<lines.length; i++){
    if(lines[i]!==''){
        allpackets[countp2] = allpackets[countp2]??[];
        allpackets[countp2].push(eval(lines[i]));
        pairs[countp1] = pairs[countp1]??[];
        pairs[countp1].push(eval(lines[i]));
        countp2++;
    }else{
        countp1++;
    }
}

const CORRECT = -1;
const CONTINUE = 0;
const INCORRECT = 1;
function compareRules(first,second){
    if(!Array.isArray(first) && !Array.isArray(second)){
        if(first<second){
            return CORRECT;
        }else if(first==second){
            return CONTINUE;
        }else{
            return INCORRECT;
        }
    }else if(Array.isArray(first) && Array.isArray(second)){
        let index = 0;
        while(index<first.length && index<second.length){
            let result = compareRules(first[index],second[index]);
            if(result==CORRECT || result==INCORRECT){
                return result;
            }
            index++;
        }
        if (index==first.length && index<second.length){
            return CORRECT;
        }else if(index==second.length && index<first.length){
            return INCORRECT;
        }else{
            return CONTINUE;
        }
    }else if(!Array.isArray(first) && Array.isArray(second)){
        return compareRules([first],second);
    }else{
        return compareRules(first,[second]);
    }
}


let part1Sum = 0;
for(let i=0; i<pairs.length; i++){
    let first = pairs[i][0];
    let second = pairs[i][1];
    if(compareRules(first,second)==CORRECT){
        part1Sum+=(i+1);
    }
}
allpackets.push([[2]]);
allpackets.push([[6]]);
allpackets.sort((a,b)=>compareRules(a,b));

let part2 = 1;
for(let i=0; i<allpackets.length; i++){
    if(allpackets[i][0]!==undefined){
        if(allpackets[i][0].length==1){
            if(allpackets[i][0][0]==2 || allpackets[i][0][0]==6){
                part2*=(i+1);
            }
        }
    }   
}
console.log("Part 1: ",part1Sum);
console.log("Part 2: ",part2);