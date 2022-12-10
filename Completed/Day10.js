const file = require("../utils/import");

let lines = file.getInput(10).split("\n");
//let lines = file.getSample("sample.txt").split("\r\n");

let commands = [];
for(let y=0; y<lines.length; y++){
    let ops = lines[y].split(' ');
    commands.push(ops);
}

let tally = 1;
let part1 = [0,0,0,0,0,0]
let count = 0;
let commandNumber = 0;
let sprite = 0;
let col = 0;
let row = 0;
let screen = [[],[],[],[],[],[]];
let incrNext = [false,0];

for(let i=0; i<240; i++){
    //part 1
    if(i==19 || i==59 || i==99 || i==139 || i==179 || i==219){
        part1[count]=tally*(i+1);
        count++;
    }

    //part2
    if(row>=sprite&&row<=sprite+2){
        screen[col][row]='#';
    }else{
        screen[col][row]=' ';
    }

    if(!incrNext[0]){
        if(commands[commandNumber]==undefined){
        }else if(commands[commandNumber][0]=="noop"){
            commandNumber++;
        }else{
            incrNext[0]=true;
            incrNext[1]=Number(commands[commandNumber][1]);
        }
    }else{
        incrNext[0]=false;
        sprite+=incrNext[1];//part2
        tally+=Number(commands[commandNumber][1]);//part1
        commandNumber++;
    }
    row++;
    if(row==40){
        row=0;
        col++;
    }
}

console.log("Part 1: ",part1.reduce(function(a, b){
    return a + b;
}, 0));
console.log("Part 2: ");
console.log(screen[0].join(''));
console.log(screen[1].join(''));
console.log(screen[2].join(''));
console.log(screen[3].join(''));
console.log(screen[4].join(''));
console.log(screen[5].join(''));