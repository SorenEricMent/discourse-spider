let slaveConfig = null;
let slaveStatus = "idle";

process.on('message', message => {
    message = JSON.parse(message);
    console.log('\x1b[32m%s\x1b[0m',"Received message from master:",message);
    switch (message.type) {
        case "task.asign":
            break;
        case "task.query":
            break;
    }
});