import React, { Component } from 'react';
import { Menu, Form, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './styles.css'






class HeaderApp extends Component {
  constructor(){
      super();
      this.state = {
          user: ''
      }
  }
  fetchUser = async () => {
    try {
      const currentUser = await fetch('http://localhost:9292/api/user', {
        credentials: 'include'
      })

      const parsedUser = await currentUser.json();
      console.log(parsedUser, "PARSED USER IN COMMENTS")

      this.setState({
        user: parsedUser.user.username
        // commentAuthor: parsedUser.comments.message
        // commentAuthor: parsedUser.user.comments
      })

    } catch(err){
        return(err)
    }
        
  }
	handleLogout = async (e) => {
  	e.preventDefault()

  	const logoutResponse = await fetch('http://localhost:9292/api/user/logout', {
     credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  	const parsedResponse = await logoutResponse.json()

  	if (parsedResponse.status === 200) {
    	console.log(parsedResponse.status, 'successfully logged out')
    	this.props.Logout(parsedResponse)
  		}
		}
    componentDidMount(){
      this.fetchUser()
    }
    render(){
      console.log(this.state.user)
        return(
        	<div class="">
        	<Menu inverted >
            <Menu.Item>
              <Link to='/home'>Home</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/mycomments'>My Comments</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/myarticles'>My Articles</Link>
            </Menu.Item>
            <div class="middle menu">
            <Menu.Item>
            <h1 class="header">NEWS APP</h1>
            </Menu.Item>
            </div>
            <div class="right menu">
            <Menu inverted>
            <Menu.Item>
              <h2>{this.state.user}</h2>
            </Menu.Item>
            </Menu>
            </div>
            <div class="left menu">
            <Menu inverted>
        		<Menu.Item>
        		<Form onSubmit={this.handleLogout}>
        			<Button className="logout"color="red"type="submit">Logout</Button>
      			</Form>
            </Menu.Item>
      			</Menu>
            
            </div>
            
            </Menu>
            <br/>
            </div>
        )
    }
}
export default HeaderApp;
            
            
