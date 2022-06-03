const discourse = require("./resources/discourse.mjs");
const fs = require("fs");

let config = JSON.parse(fs.readFileSync("./config.json"));

console.log('\x1b[33m%s\x1b[0m',"Discourse-Spider v0.1.0 \"Paccheri\" by Winslow SorenEricMent");

