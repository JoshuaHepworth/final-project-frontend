import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react'

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
          	<Form onSubmit={this.handleSubmit}>
						<Form.Input onChange={this.handleChange} type="text" value={this.state.search} name='search' placeholder="Search News Sources"/>
          		<Button type="submit">Search</Button>
      			</Form>
      		</div>

        )
    }
}
export default Search;
