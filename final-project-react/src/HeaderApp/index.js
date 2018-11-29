import React, { Component } from 'react';
import { Menu, Grid, Form, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

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
        	<Menu>
        		<Form onSubmit={this.handleLogout}>
        			<Button className="visibile content"color="red"type="submit">Logout</Button>
      			</Form>
      			<Menu.Item>
            	<Link to='/home'>Home</Link>
            </Menu.Item>
            <Menu.Item>
            	<Link to='/mycomments'>My Comments</Link>
            </Menu.Item>
            <Menu.Item>
            	<Link to='/myarticles'>My Articles</Link>
            </Menu.Item>
            </Menu>
        )
    }
}
export default HeaderApp;
