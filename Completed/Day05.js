const file = require("../utils/import");

let input = file.getInput(5);

var part1 = [[],[],[],[],[],[],[],[],[]];
var part2 = [[],[],[],[],[],[],[],[],[]];

let [towers, moves] = input.split("\n\n");
towers = towers.split('\n').slice(0,-1);
moves = moves.split('\n');
for (let i=0; i<towers.length; i++){
    for(let x=0; x<towers[i].length; x+=4){
        if(towers[i][x+1] !== ' '){
            part1[x/4].push(towers[i][x+1]);
            part2[x/4].push(towers[i][x+1]);
        }
    }
}

for(let i=0; i<moves.length; i++){
    let split = moves[i].split(" ");
    let move = Number(split[1]);
    let from = Number(split[3]-1)
    let to = Number(split[5]-1);
    executeMove(part1, move, from, to);
    executeMove(part2, move, from, to, false);
}

function executeMove(containers, times, source, destination, part1=true){
    let arr = containers[source].splice(0,times);
    if(part1){
        arr.reverse();
    }
    containers[destination] = arr.concat(containers[destination]);
}

console.log("Part 1: ", part1.map((col)=>col[0]).join(''));
console.log("Part 2: ", part2.map((col)=>col[0]).join(''));