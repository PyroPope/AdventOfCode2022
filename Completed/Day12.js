const file = require("../utils/import");

let lines = file.getInput(12).split("\n");

let mountain = [];
let weighted = [];
for(let i=0; i<lines.length; i++){
    let words = lines[i].split('');
    let weights=words.map(ele=>{
        if(ele==='S'){
            return 1;
        }else if(ele==='E'){
            return 26;
        }else{
            return ele.charCodeAt(0)-96;
        }
    });
    mountain.push(words);
    weighted.push(weights);
}
let ROW = mountain.length;
let COL = mountain[0].length;

function bestPath(part1){
    let paths = [];
    let pathSet = new Set();
    for(let r=0; r<ROW; r++){
        for(let c=0; c<COL; c++){
            if((part1 && mountain[r][c]=='S') || (!part1 && weighted[r][c]==1)){
                paths.push([[r,c],0]);
            }
        }
    }

    while (paths.length>0){
        let current = paths.shift();
        let row = current[0][0];
        let col = current[0][1];
        let value = current[1];
        if(!pathSet.has(row+"X"+col)){
            pathSet.add(row+"X"+col);
            if(mountain[row][col]=='E'){
                return value;
            }
            let dr = [-1,1,0,0];
            let dc = [0,0,-1,1];
            for(let i=0; i<4; i++){
                let newR = row+dr[i];
                let newC = col+dc[i];
                if(newR>=0 && newR<ROW && newC>=0 && newC<COL && weighted[newR][newC]<=weighted[row][col]+1){
                    paths.push([[newR, newC], value+1]);
                }
            }
        }
    }
}
console.log("Part 1: ",bestPath(true));
console.log("Part 2: ",bestPath(false));