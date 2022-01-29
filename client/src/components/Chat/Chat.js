import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

let socket;

function Chat({location}) {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessege] = useState('');
    const [messages, setMesseges] = useState([]);
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const {name, room} = queryString.parse(location.search)
        
        socket = io(ENDPOINT);
        setName(name)
        setRoom(room)

        socket.emit('join', {name, room}, ()=>{

        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    },[ENDPOINT, location.search])

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMesseges([...messages, message]);
        })
    },[messages])

    const sendMessage = (event) => {
        event.preventDefault();
        if(message){
            socket.emit('sendMessage', message, ()=> setMessege(''));
        }
    }

    console.log(`message : ${message}`, `messages, ${messages}`);

    return (
        <div>
            <div>
                <input 
                value={message} 
                onChange={(event)=>setMessege(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? socket.emit('sendMessage', message, ()=> setMessege('')) : null}/>
            </div>
        </div>
    )
}

export default Chat
