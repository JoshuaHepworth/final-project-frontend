import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import './styles.css'

class Search extends Component {
	constructor(){
	    super();
	    this.state = {
	        search: ''
	    }
	}
	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.getResults(this.state.search)
	}
    render(){
        return(
        	<div>
          	<form onSubmit={this.handleSubmit}>
						<input onChange={this.handleChange} type="text" value={this.state.search} name='search' placeholder=" Search News..."/>
          		<Button color="green"type="submit">Search</Button>
      			</form>
      		</div>

        )
    }
}
export default Search;
