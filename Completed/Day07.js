const file = require("../utils/import");

let input = file.getInput(7).split("\n");
//let input = file.getSample("sample.txt").split("\r\n");

let dirName = ["/"];
let folderSizes = [];

for(let i=0; i<input.length; i++){
    let line = input[i].split(" ");
    if(line[0]=="$"){
        if(line[1]=="cd"){
            if(line[2]=="/"){
                dirName=["/"];
            }else if(line[2]==".."){
                dirName.pop();
            }else{
                dirName.push(line[2]);  
            }
        }
    }else if(line[0]!=="dir"){
        for(let i=0; i<=dirName.length; i++){
            let path = (dirName.slice(0,i)).join('/');
            folderSizes[path]=folderSizes[path]??0;
            folderSizes[path]+=Number(line[0]);
        }
    }

}

let part1=0;
let part2=99999999999;
let freeNeeded = folderSizes['/']-40000000;
for(let folders in folderSizes){
    if(folderSizes[folders]<=100000){
        part1+=folderSizes[folders];
    }
    if(folderSizes[folders]>=freeNeeded){
        part2=Math.min(part2,folderSizes[folders]);
    }
}

console.log("Part 1: ",part1);
console.log("Part 2: ",part2);