import React, {useState} from 'react'
import {Link} from 'react-router-dom'

import './Home.css'

function Home() {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    // function handleLink(event){
    //     if(!name || !room){
    //         event.preventDefault();
    //         return;
    //     }else{
    //         return null;
    //     }
    // }

    return (
        <div className="aa">
            <div className="dd">
                <h1 className="g">Join</h1>
                <div><input placeholder="Write Name" type="text" onChange={(event)=> setName(event.target.value)}/></div>
                <div><input placeholder="Write Room" type="text" onChange={(event)=> setRoom(event.target.value)}/></div>
                <Link onClick={event => (!name || !room)? event.preventDefault():null} to={`/chat?name=${name}&room=${room}`}>
                <button type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Home
