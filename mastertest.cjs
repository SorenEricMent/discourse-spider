const { fork } = require('node:child_process');

const forked = fork('slavetest.cjs');

forked.on('message', (msg) => {
  console.log('Message from child', msg);
});

forked.send({ hello: 'world' });