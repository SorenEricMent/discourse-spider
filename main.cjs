const api = require("./resources/api.mjs");
const db = require("./resources/localdb.mjs");
const fs = require("fs");

let config = JSON.parse(fs.readFileSync("./config.json"));

console.log('\x1b[33m%s\x1b[0m',"Discourse-Spider v0.1.0 \"Paccheri\" by Winslow SorenEricMent");

let taskList = [];

for(const withConfig of config.with){
    taskList.push(
        taskExecutor(config.target_name,withConfig)
    );
}

Promise.allSettled(taskList).then((results)=>{
    let success,failed = 0;
    console.log('\x1b[32m%s\x1b[0m',"All tasks are done.");
    process.exit(0);
});

function taskExecutor(name,task){
    return new Promise((resolve,reject)=>{

    });
}

