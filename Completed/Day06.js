const file = require("./utils/import");

let input = file.getInput(6);

let part1 = 0;
let part2 = 0;
for(let i=0; i<input.length; i++){
    let set1 = new Set();
    let set2 = new Set();
    if(part1==0){
        for(let x=0; x<4; x++){
            set1.add(input[i+x]);
        }
        if(set1.size==4){
            part1 = i+4;
        }
    }else{
        for(let x=0; x<14; x++){
            set2.add(input[i+x]);
        }
        if(set2.size==14){
            part2 = i+14;
            break;
        }
    }
}
console.log("Part 1: ",part1);
console.log("Part 2: ",part2);