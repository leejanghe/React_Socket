import './App.css';
import React,{useState, useEffect} from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:7000');
const userName = 'User '+parseInt(Math.random()*10);

function App() {

  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('message', payload => {
      setChat([...chat, payload]);
    })
  })

  const sendMessage =(e)=>{
    // send mssage on socket
    e.preventDefault();
    console.log(message);
    socket.emit('message', {userName ,message});
    setMessage('')
    
  }

  return (
    <div className="App">
      <h1>Welcome to chat app</h1>
      <form onSubmit={sendMessage}>
        <input 
        type='text' 
        name="message"
        placeholder="write your message"
        value={message}
        onChange={(e)=>{setMessage(e.target.value)}}
        required
        ></input>
        <button type="submit">Send</button>
      </form>
      {chat.map((payload, index)=>{
        return(
          <h1 key={index}>{payload.userName}: <span>{payload.message}</span></h1>
        )
      })}
    </div>
  );
}

export default App;
