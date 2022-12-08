const file = require("../utils/import");

let lines = file.getInput(8).split("\n");
//let lines = file.getSample("sample.txt").split("\r\n");
let tree = [[]]
for(let y=0; y<lines.length; y++){
    let numbers = lines[y].split('');
    tree[y] = tree[y]??[];
    for(let x=0; x<numbers.length; x++){
        tree[y][x]=Number(numbers[x])
    }
}

//For Part 2
let treeHeights = [];

let maxX = tree[0].length;
let maxY = tree.length;

function checkLeft(_x,y){
    let count=0;
    for(let x=_x+1; x<maxX; x++){
        count++
        if(tree[y][x]>=tree[y][_x]){
            treeHeights[y+"-"+_x].right=count;
            return false;
        }
    }
    treeHeights[y+"-"+_x].right=count;
    return true;
}
function checkRight(_x,y){
    let count=0;
    for(let x=_x-1; x>=0; x--){
        count++
        if(tree[y][x]>=tree[y][_x]){
            treeHeights[y+"-"+_x].left=count;
            return false;
        }
    }
    treeHeights[y+"-"+_x].left=count;
    return true;
}

function checkUp(x,_y){
    let count=0;
    for(let y=_y-1; y>=0; y--){
        count++
        if(tree[y][x]>=tree[_y][x]){
            treeHeights[_y+"-"+x].up=count;
            return false;
        }
    }
    treeHeights[_y+"-"+x].up=count;
    return true;
}

function checkDown(x,_y){
    let count=0;
    for(let y=_y+1; y<maxY; y++){
        count++
        if(tree[y][x]>=tree[_y][x]){
            treeHeights[_y+"-"+x].down=count;
            return false;
        }
    }
    treeHeights[_y+"-"+x].down=count;
    return true;
}

function checkNeighbours(x,y){
    treeHeights[y+"-"+x]=treeHeights[y+"-"+x]??[];
    if(x!==0 && x!==maxX-1 && y!==0 && y!==maxY-1){
        //Originally had these all in the returned, 
        //then realized part 2 wasn't working because of it.
        let down = checkDown(x,y);
        let up = checkUp(x,y);
        let right = checkRight(x,y);
        let left = checkLeft(x,y);
        return down||up||right||left;
    }else{
        return true
    }
}

let part1=0;
let part2=0;
for(let y=0; y<maxY; y++){
    for(let x=0; x<maxX; x++){
        let i = y+"-"+x;
        if(checkNeighbours(x,y)){
            part1++;
        }
        let treeTotal = treeHeights[i].left*treeHeights[i].right*treeHeights[i].up*treeHeights[i].down;
        if(treeTotal>part2){
            part2 = treeTotal;
        }
    }
}
console.log("Part 1: ",part1);
console.log("Part 2: ",part2);