const file = require("../utils/import");

let lines = file.getInput(15).split("\n");
let sensors = [];
let beacons = new Set();
let target = 2000000;
let part1 = 0;
let minx = 9999999999;
let maxx = -99999999999;

for(let i=0; i<lines.length; i++){
    var matches = lines[i].match(/-?(\d+)/g).map(ele=>Number(ele));
    sensors.push({x:matches[0], y:matches[1], d:Math.abs(matches[0]-matches[2])+Math.abs(matches[1]-matches[3])})
    beacons.add(matches[2]+"x"+matches[3]);
    if(matches[0]+sensors[i].d>maxx)
        maxx = matches[0]+sensors[i].d;
    if(matches[0]-sensors[i].d<minx)
        minx = matches[0]-sensors[i].d;
}

function checkIfValid(x,y){
    for(let i=0; i<sensors.length; i++){
        let d = Math.abs(x-sensors[i].x)+Math.abs(y-sensors[i].y);
        if(d<=sensors[i].d){
            return false;
        }
    }
    return true;
}

for(let x=minx; x<maxx; x++){
    if(!checkIfValid(x,target)){
        let key = x+"x"+target;
        if(!beacons.has(key)){
            part1++;
        }
    }
}

console.log("Part 1:", part1);

function Part2(){
    let pointsChecked = new Set();
    /// IE. d=1
    ///            x
    ///           BSx
    ///            x
    /// need to check d=2
    ///            x
    ///           x-x
    ///          x---x
    ///           x-x
    ///            x
    for(let i=0; i<sensors.length; i++){
        let d = sensors[i].d+1;
        let mod = 0;
        //conditions could be added here to make sure x+d or x-d are viable before checking x's
        //then check if new x and y are in bounds before checking if valid.
        //But this runs fast enough without it.
        for(let x=sensors[i].x-d; x<sensors[i].x+d; x++){
            //everytime I move over 1 x I move up and down 1 y and check both.
            if(!pointsChecked.has(x+"x"+sensors[i].y-mod)){
                if(checkIfValid(x,sensors[i].y-mod)){
                    return (x*4000000)+sensors[i].y-mod
                }
            }
            if(!pointsChecked.has(x+"x"+sensors[i].y+mod)){
                if(checkIfValid(x,sensors[i].y+mod)){
                    return (x*4000000)+sensors[i].y+mod
                }
            }
            pointsChecked.add(x+"x"+sensors[i].y-mod);
            pointsChecked.add(x+"x"+sensors[i].y+mod);
            mod++;
        }
    }
}

console.log("Part 2:", Part2());