const file = require("../utils/import");

let lines = file.getInput(9).split("\n");

let commands = []
for(let y=0; y<lines.length; y++){
    let ops = lines[y].split(' ');
    commands.push({dir:ops[0],amount:ops[1]});
}

function adjustPositions(h,t){
    let dy = Math.abs(h[0]-t[0]);
    let dx = Math.abs(h[1]-t[1]);
    let newy = t[0];
    let newx = t[1];
    if(dy < 2 && dx < 2){

    }else if(dy>=2 && dx>=2){
        if(t[0]<h[0]){
            newy = h[0]-1;
        }else{
            newy = h[0]+1;
        }
        if(t[1]<h[1]){
            newx = h[1]-1;
        }else{
            newx = h[1]+1;
        }
    }else if(dy>=2){
        if(t[0]<h[0]){
            newy = h[0]-1;
        }else{
            newy = h[0]+1;
        }
        newx = h[1];
    }else if(dx>=2){
        newy = h[0]
        if(t[1]<h[1]){
            newx = h[1]-1;
        }else{
            newx = h[1]+1;
        }
    }
    return [newy,newx];
}

let p1visited = new Set();
let p2visited = new Set();
let tails = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
let head = [0,0];
for(let i in commands){
    let cmd = commands[i];
    for(let a=0; a<cmd.amount; a++){
        if(cmd.dir=='U'){
            head[0]++;
        }else if(cmd.dir=='D'){
            head[0]--;
        }else if(cmd.dir=='L'){
            head[1]--;
        }else if(cmd.dir=='R'){
            head[1]++;
        }
        tails[0] = adjustPositions(head,tails[0]);
        for(let t=1; t<9; t++){
            tails[t] = adjustPositions(tails[t-1],tails[t]);
        }
        p1visited.add(tails[0][0]+"x"+tails[0][1]);
        p2visited.add(tails[8][0]+"x"+tails[8][1]);
    }
}
console.log("Part 1: ",p1visited.size);
console.log("Part 2: ",p2visited.size);