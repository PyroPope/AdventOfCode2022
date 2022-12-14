const file = require("../utils/import");

let lines = file.getInput(14).split("\n");
//let lines = file.getSample("sample.txt").split("\r\n");

let minr = 99999;
let minc = 99999;
let maxr = -99999;
let maxc = -99999; 
let pathcount = 0;
let drawrock = [];
let impact = new Set();


for(let i=0; i<lines.length; i++){
    let words = lines[i].split(" -> ");
    for(let pair in words){
        let coords = words[pair].split(",").map(ele=>Number(ele));
        if(coords[0]>=maxr){
            maxr=coords[0];
        }
        if(coords[1]>=maxc){
            maxc=coords[1];
        }
        if(coords[0]<=minr){
            minr=coords[0];
        }
        if(coords[1]<=minc){
            minc=coords[1];
        }
        drawrock[pathcount]=drawrock[pathcount]??[]
        drawrock[pathcount].push(coords);
    }
    pathcount++;
}

for(let i=0; i<drawrock.length; i++){
    let last = [-1,-1];
    for(let d=0; d<drawrock[i].length; d++){
        let indexes = [drawrock[i][d][0],drawrock[i][d][1]];
        if(last[0]==-1){
            impact.add(indexes[0]+"x"+indexes[1]);
        }else{
            if(last[1]==indexes[1]){
                let max=last[0];
                let min=indexes[0];
                if(last[0]<indexes[0]){
                    min=last[0];
                    max=indexes[0];
                }
                for(let i=min; i<=max; i++){
                    impact.add(i+"x"+indexes[1]);
                }
            }else if(last[0]==indexes[0]){
                let max=last[1];
                let min=indexes[1];
                if(last[1]<indexes[1]){
                    min=last[1];
                    max=indexes[1];
                }
                for(let i=min; i<=max; i++){
                    impact.add(indexes[0]+"x"+i);
                }
            }
        }
        last=[indexes[0],indexes[1]];
    }
}

//Add floor Part 2
for(let r=minr-1000; r<maxr+1000; r++){
    impact.add(r+"x"+(maxc+2));
}

let found = false;
let part2 = false;
for(let i=0; !found; i++){
    let sand = [500,0];
    while (true){
        //Check for falling off grid in Part 1;
        if(sand[1]+1>=maxc+2 && !part2){
            console.log("Part 1:", i);
            part2 = true;
        }
        let down=sand[0]+"x"+(sand[1]+1); 
        let downleft=(sand[0]-1)+"x"+(sand[1]+1); 
        let downright=(sand[0]+1)+"x"+(sand[1]+1);
        if(!impact.has(down)){
            sand[1]++;
        }else if(!impact.has(downleft)){
            sand[0]--;
            sand[1]++
        }else if(!impact.has(downright)){
            sand[0]++;
            sand[1]++;
        }else{
            break;
        }
    }
    if(sand[0]==500 && sand[1]==0){
        console.log("Part 2:",i+1);
        found = true;
    }
    impact.add(sand[0]+"x"+sand[1]);
}