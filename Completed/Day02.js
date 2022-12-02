const file = require("../utils/import");

let input = file.getInput(2).split("\n");
//let input = file.getSample("sample.txt").split("\r\n")

const R = 1;
const P = 2;
const S = 3;
const Draw = 3;
const Loss = 0;
const Win = 6;

//I used words here just to make things more clear. Originally 
//I just used numbers / letters all the way through without the translation table.

//Part 1 We use the translation and calculate whether each game is a win or loss or draw
let p1Translation = {'A':'Rock','B':'Paper','C':'Scissors',
                     'X':'Rock','Y':'Paper', 'Z':'Scissors'}
let p1Score = {
    'Rock':{'Rock':R+Draw,'Paper':P+Win,'Scissors':S+Loss}, 
    'Paper':{'Rock':R+Loss,'Paper':P+Draw,'Scissors':S+Win}, 
    'Scissors':{'Rock':R+Win,'Paper':P+Loss,'Scissors':S+Draw}
};

//Part 2 we are forced to make either a draw win or loss, and we get points based on that
//Also what we throw to make the Loss, Draw, or Win happen.
let p2Translation = {'A':'Rock','B':'Paper','C':'Scissors',
                     'X':'Loss','Y':'Draw', 'Z':'Win'}
let p2Score = {
    'Rock':{'Loss':S+Loss,'Draw':R+Draw,'Win':P+Win},
    'Paper':{'Loss':R+Loss,'Draw':P+Draw,'Win':S+Win},
    'Scissors':{'Loss':P+Loss,'Draw':S+Draw,'Win':R+Win}
}

let p1 = 0;
let p2 = 0;
for(let i=0; i<input.length; i++){
    if(input[i]=="")
        break;
    let game=input[i].split(' ');

    //Part 1
    let them = p1Translation[game[0]];
    let you = p1Translation[game[1]];
    p1+=p1Score[them][you];
    
    //Part 2
    you = p2Translation[game[1]];
    p2+=p2Score[them][you];
}

console.log("Part 1: ", p1);
console.log("Part 2: ", p2);