const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors:{
        origin:'*'
    }
});


io.on('connection', (socket) => {
    console.log('connection made successfully');
    socket.on('message', payload =>{
        console.log('meeaage received', payload);
        io.emit('message', payload);
    })
})


server.listen(7000,()=>{
    console.log('Server is running on port 7000');
});



console.log('server start!!!~!@!@')