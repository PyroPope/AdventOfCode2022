const fs = require("fs");
require('dotenv').config()
var request = require('sync-request');
function getTextURL(int){
    let res = request('GET', 'https://adventofcode.com/2022/day/'+int+'/input', { 
        headers: {
            'Content-Type': 'text/plain',
            Cookie: `session=${process.env.TOKEN}`,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
        }
    });
    return res.body.toString().trimEnd();
}

function getText(filename){
    if(filename.indexOf(".txt")<0 && filename.indexOf(".js")<0){
        filename+=".txt";
    }
    let old = filename;
    if(fs.existsSync(filename)){
        return fs.readFileSync(filename).toString('utf-8').trimEnd();
    }else{
        filename = './'+old;
        if(fs.existsSync(filename)){
            return fs.readFileSync(filename).toString('utf-8').trimEnd();
        }
        filename = './Completed/'+old;
        if(fs.existsSync(filename)){
            return fs.readFileSync(filename).toString('utf-8').trimEnd();
        }
    }
    return "Unable to load file.";
}

exports.getSample = getText;
exports.getInput = getTextURL;