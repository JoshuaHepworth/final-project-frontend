import React, { Component } from 'react';
import './App.css';
import MainContainer from './MainContainer'
import LoginRegister from './LoginRegister'
import {Route, Switch} from 'react-router-dom'
import MyComments from './MyComments'
import SwitchController from './SwitchController'

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
