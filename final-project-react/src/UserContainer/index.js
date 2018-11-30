import React, { Component } from 'react';


class UserContainer extends Component {
	constructor(){
    super();
    this.state = {
        user: ''
    }
	}
    render(){
        return(
            <h1> user container </h1>
        )
    }
}
export default UserContainer;
