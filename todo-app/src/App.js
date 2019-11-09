import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Message from './components/Message';

function App() {
  const [name, setName] = useState("");

  const handleTextInput = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div className="form">
          <input type="text" onChange={handleTextInput} />
        </div>
        
        <Message name={name} />

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
