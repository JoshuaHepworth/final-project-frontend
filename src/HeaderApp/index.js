import React, { Component } from 'react';
import { Menu, Form, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './styles.css'
import apiUrl from '../apiUrl'





class HeaderApp extends Component {
  constructor(){
      super();
      this.state = {
          user: ''
      }
  }
  fetchUser = async () => {
    try {
      const currentUser = await fetch(apiUrl + '/api/user', {
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

  	const logoutResponse = await fetch(apiUrl + '/api/user/logout', {
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
        	<div class="menu">
          <Menu secondary inverted>
            
            <Menu.Item>
              <h2 class="home"><Link to='/home'>Home</Link></h2>
            </Menu.Item>
            <Menu.Item>
              <h2 class="comment"><Link to='/mycomments'>My Comments</Link></h2>
            </Menu.Item>
            <Menu.Item>
              <h2 class="article"><Link to='/myarticles'>My Articles</Link></h2>
            </Menu.Item>
            
            
            
            
            
            <Menu.Menu position="right">
            <Menu.Item>
              <h2 class ="user">{this.state.user}</h2>
            </Menu.Item>
            
            
            
            
        		<Menu.Item>
        		<Form onSubmit={this.handleLogout}>
        			<Button className="logout"color="red"type="submit">Logout</Button>
      			</Form>
            </Menu.Item>
      			
            
            
            </Menu.Menu>
            </Menu>
            <br/>
            </div>
        )
    }
}
export default HeaderApp;
            
            
