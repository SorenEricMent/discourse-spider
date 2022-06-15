const api = require("./resources/api.mjs");
const db = require("./resources/localdb.mjs");
const fork = require('child_process').fork;
const fs = require("fs");

const debug = true;

let config = JSON.parse(fs.readFileSync("./config.json"));

console.log('\x1b[33m%s\x1b[0m',"Discourse-Spider v0.1.0 \"Paccheri\" by Winslow SorenEricMent");

let slavePool = [];
let taskList = [];

