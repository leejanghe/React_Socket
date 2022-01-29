const express = require('express');
const socketio = require('socket.io')
const http = require('http')

const {addUser, removeUser, getUser, getUserInRoom} = require('./users')

const app = express();
const server = http.createServer(app);
const io = socketio(server,{
    cors:{
        origin:'*'
    }
});

const PORT = process.env.PORT || 5000;

const router = require('./router');

app.use('/', router);

io.on('connect', (socket) => {
    console.log('connection made successfully');

    socket.on('join',({name, room},callback)=>{
        console.log(name, room);

        const {error, user} = addUser({id: socket.id, name, room});

        if(error)callback(error)
    
            socket.emit('message',{user:'admin', text:`${user.name} has joined`});
            socket.broadcast.to(user.room).emit('message',{user:'admin', text:`${user.name} has joined`});
            socket.join(user.room)
            callback();
        
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', {user: user.name, text:message});

        callback();
    })

    socket.on('disconnect', () => {
        console.log('disconnected');
    })
})


server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
