const file = require("../utils/import");

let lines = file.getInput(11).split("Monkey ");

let monkeys1 = [];
let monkeys2 = [];
let curmonkey = -1;
let lowestCommonMultiple = 1; // needed for part 2;
//Opted to assign multiple arrays at creation rather than messing with javascript deepcopy.
for(let i=0; i<lines.length; i++){
    if(lines[i]=='')
        continue;
    let monkey = lines[i].split('\n');
    for(let index in monkey){
        let attribute = monkey[index].trim().split(":");
        if(attribute[0]=='')
            continue;
        if(attribute[1]==''){
            curmonkey=Number(attribute[0]);
            monkeys1[curmonkey]=monkeys1[curmonkey]??[];
            monkeys2[curmonkey]=monkeys2[curmonkey]??[];
        }else if(attribute[0]=='Starting items'){
            monkeys1[curmonkey]["items"] = attribute[1].trim().split(", ").map(ele=>{return Number(ele)});;
            monkeys2[curmonkey]["items"] = attribute[1].trim().split(", ").map(ele=>{return Number(ele)});;
        }else if(attribute[0]=='Operation'){
            let splitline = attribute[1].split(' ');
            let op = splitline[4];
            let amount = splitline[5];
            monkeys1[curmonkey]["op"] = op;
            monkeys1[curmonkey]["amount"]=amount=="old"?amount:Number(amount);
            monkeys2[curmonkey]["op"] = op;
            monkeys2[curmonkey]["amount"]=amount=="old"?amount:Number(amount);
        }else if(attribute[0]=='Test'){
            let divide = Number(attribute[1].split(' by ')[1]);
            lowestCommonMultiple *= divide; // Added for Part 2;
            monkeys1[curmonkey]["test"]=divide;
            monkeys2[curmonkey]["test"]=divide;
        }else if(attribute[0].includes('If')){
            let condition = attribute[0].split(' ')[1];
            let toMonkey = Number(attribute[1].split(' monkey ')[1])
            monkeys1[curmonkey]["result"] = monkeys1[curmonkey]["result"]??{};
            monkeys1[curmonkey]["result"][condition]=toMonkey;
            monkeys2[curmonkey]["result"] = monkeys2[curmonkey]["result"]??{};
            monkeys2[curmonkey]["result"][condition]=toMonkey;
        }
    }
}
function solution(monkeys, part2){
    let rounds = part2?10000:20;
    let inspectCount = [];
    for(let round=0; round<rounds; round++){
        for(let m in monkeys){
            inspectCount[m]=inspectCount[m]??0;
            for(let i=0; i<monkeys[m].items.length; i++){
                let amount = monkeys[m].amount=="old"?monkeys[m].items[i]:monkeys[m].amount;
                let item = monkeys[m].op=='*'?monkeys[m].items[i]*amount:monkeys[m].items[i]+amount;
                if(part2){
                    item %= lowestCommonMultiple;
                }else{
                    item = Math.floor(item/3);
                }
                let destination = monkeys[m].result[item%monkeys[m].test==0];
                monkeys[destination].items.push(item);
                inspectCount[m]++;
            }
            monkeys[m].items=[];
        }
    }
    inspectCount.sort(function(a, b) {
        return a - b;
      }).reverse();
    return inspectCount[0]*inspectCount[1];
}

console.log("Part 1: ",solution(monkeys1,false));
console.log("Part 2: ",solution(monkeys2,true));