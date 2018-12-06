import React, { Component } from 'react';
import './styles.css'
import { Form, Button, Grid, Segment, Menu, Card } from 'semantic-ui-react';

import apiUrl from '../apiUrl'

class LoginRegister extends Component {
	constructor(){
	    super();
	    this.state = {
	        username: '',
	        password: '',
	        which: 'login',
	        message: ''
	    }
	}
	//handles the changes of input in the form for login/register
	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
	handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch(apiUrl + '/api/user/' + this.state.which, {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const parsed = await response.json()
		if (parsed.status === 200) {
			this.props.LogIn(parsed.logged_in_as)
		} else {
			this.setState({
				message: parsed.message
			})
		}
	}
	toggle = () => {
		if (this.state.which === 'login') {
			this.setState({
				which: 'register'
			})
		} else {
			this.setState({
				which: 'login'
			})
		}
	}
    render(){
        return(
        	<div>
        	<Menu inverted>
        	<Menu.Item>
        	<h1>Welcome!</h1>
        	</Menu.Item>
        	</Menu>
        		<Grid container columns={1} textAlign='center' vertical='middle' style={{height: '100%'}}>
        		<Grid.Column style={{maxWidth: 450}}>
        		<Segment>
        		<Card size="large"fluid color="red">
            	<h1 class="invalid">{this.state.message}</h1>
          	</Card>
            	<h1> {this.state.which === "login" ? "Log in here" : "Register here"} </h1>
            		<Form onSubmit={this.handleSubmit}>
		            	<input
		            		type="text"
		            		name="username"
		            		placeholder="username"
		            		value={this.state.username}
		            		onChange={this.handleChange}
		            		/>
	            		<input
	            			type="password"
	            			name="password"
	            			placeholder="password"
	            			value={this.state.password}
	            			onChange={this.handleChange}
	            			/> <br />
            			<Button color="green">
            				{this.state.which === "login" ? "Login" : "Register"}
            			</Button>
            			<br />
            			<br />
            			<small>
            				<h3>{this.state.which === "login" ? "Need an account? Sign Up" : "Already have an account? Log in here"}
            				<span className="fake-link" onClick={this.toggle}> here</span></h3>
            			</small>
            			</Form>
            		</Segment>
           		</Grid.Column>
         		</Grid>
        	</div>
            
        )
    }
}
export default LoginRegister;
