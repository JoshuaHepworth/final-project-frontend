import React, { Component } from 'react';
import { Menu, Form, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './styles.css'






class HeaderApp extends Component {
	
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
    render(){
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
            <div class="">
            <Menu.Item>
            <h1>SCOPE</h1>
            </Menu.Item>
            </div>
            <div class="right menu">
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
            
            
