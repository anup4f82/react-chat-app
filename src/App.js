import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TextInput from './textInput'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Chat App</h2>
        </div>
   
        <div className="container-fluid">
          <TextInput />
        </div>
      </div>
    );
  }
}

export default App;
