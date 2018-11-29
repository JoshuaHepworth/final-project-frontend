import React, { Component } from 'react';
import HeaderApp from '../HeaderApp'
import { Segment, Header, Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {Route, Switch} from 'react-router-dom'
import MyComments from '../MyComments'
import MyArticles from '../MyArticles'
import SwitchController from '../SwitchController'
import Search from '../Search'

const apiKey = 'c2060d4c459b4dc3ab9fe16b4b16c82c'

class MainContainer extends Component {
	constructor(){
	    super();
	    this.state = {
	        articles: [],
	        clickedComments: false
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
	async fetchArticlesSearched(search) {
		const userSearch = search
		const response = await fetch('https://newsapi.org/v2/top-headlines?sources=' + userSearch+'&apiKey='+ apiKey)
		const parsed = await response.json();
			this.setState({
				articles: parsed.articles
			})
	}
	componentDidMount(){
		this.fetchArticles();
	}
	getResults = (query) => {
		const userQuery = query;
		this.fetchArticlesSearched(userQuery).then((articles) => {
		})
	}
    render(){
    	const articleList = this.state.articles.map((article, i) => {
    		return (
    				<div>
    					<Grid container columns={1} textAlign='center' vertical='middle' style={{height: '100%'}}>
        				<Grid.Column style={{maxWidth: 600}}>
    							<Segment>
    								<Image key={i} src={article.urlToImage} />
    								<h2> {article.source.name} </h2>
    								<Header>By:  {article.author} </Header>
    								<h2> {article.title} </h2>
    								<h2> {article.description} </h2>
    								<a href={article.url}>Full article</a>
    							</Segment>
    						</Grid.Column>
	    				</Grid>	
    				</div>
    			)
    	})
        return(
        	<div>
        		<Search getResults={this.getResults} />
      			<SwitchController />
        		<HeaderApp Logout={this.props.Logout}/>

            <h1> Top Headlines </h1>
            {articleList}
		      </div>
        )
    }
}
export default MainContainer;
