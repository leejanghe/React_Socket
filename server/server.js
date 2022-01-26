const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(6000,()=>{
    console.log('Server is running on port 6000');
});

console.log('server start!!!~!@!@')