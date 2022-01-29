import './App.css';
// import React,{useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from './components/Home/Home';
import Chat from './components/Chat/Chat';


function App() {

  return (
    <Router>
      <Route path="/" exact component={Home} />
      {/* render={()=><Home />}/> */}
      <Route path="/chat" component={Chat} />
      {/* // render={()=><Chat />}/> */}
    </Router>
  );
}

export default App;
