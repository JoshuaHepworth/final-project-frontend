import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
      super();
      this.state = {
          loggedIn: false,
          username: ''
      }
  }

  LogIn = (username) => {
    this.setState({
      loggedIn: true,
      username: username
    })
  }

  Logout = (username) => {
    this.setState({
      loggedIn: false,
      username: username
    })
  }
  render() {
    return (
      <div className="App">
      { this.state.loggedIn ? <MainContainer Logout={this.Logout}/> : <LoginRegister LogIn={this.LogIn}/> }
      </div>
    );
  }
}

export default App;
