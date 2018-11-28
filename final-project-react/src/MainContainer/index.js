import React, { Component } from 'react';
import HeaderApp from '../HeaderApp'

const apiKey = 'c2060d4c459b4dc3ab9fe16b4b16c82c'

class MainContainer extends Component {
	constructor(){
	    super();
	    this.state = {
	        articles: []
	    }
	}
	async fetchArticles() {
		const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey='+ apiKey)
		const parsed = await response.json();
		this.setState({
			articles: parsed.articles
		})
			console.log(parsed.articles)
	}
	componentDidMount(){
		this.fetchArticles();
	}
    render(){
        return(
        	<div>
        		<HeaderApp Logout={this.props.Logout}/>
            <h1> Main Container </h1>
          </div>
        )
    }
}
export default MainContainer;
