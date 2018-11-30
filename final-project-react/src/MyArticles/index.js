import React, { Component } from 'react';
import { Segment, Header, Grid, Image, Button } from 'semantic-ui-react'

class MyArticles extends Component {
	constructor(){
	    super();
	    this.state = {
	        articles: [],
	        user: '',
	        articleDelete: ''
	    }
	}
	fetchArticles = async () => {
    try {
    	const response = await fetch('http://localhost:9292/api/user/articles', {
    		credentials: 'include'
    	})
    	console.log(response)
    	const parsedResponse = await response.json();

    	console.log(parsedResponse, 'parsed response')

    	this.setState({
    		articles: parsedResponse.articles
    	})

    } catch(err){
        return(err)
    }
		    
	}
	fetchUser = async () => {
    try {
    	const currentUser = await fetch('http://localhost:9292/api/user', {
    		credentials: 'include'
    	})

    	const parsedUser = await currentUser.json();
    	console.log(parsedUser)

    	this.setState({
    		user: parsedUser.user.username
    	})

    } catch(err){
        return(err)
    }
		    
	}
	deleteArticle = async	(id) => {
	const response = await fetch('http://localhost:9292/api/article/', + id, {
		method: 'DELETE',
		credentials: 'include'
	})
	console.log(response, 'this is the response from delete')
	const parsedResponse = await response.json();
	console.log(parsedResponse, 'this is delete parsed')
		this.setState({
			articles: parsedResponse.articles
		})
	this.fetchArticles()
	}
	componentDidMount(){
		this.fetchUser();
		this.fetchArticles();
	}
    render(){
    	const articles = this.state.articles.map((article, i) => {
    		return (
  				<div key={i}>
						<Grid container columns={1} textAlign='center' vertical='middle' style={{height: '100%'}}>
	    				<Grid.Column style={{maxWidth: 600}}>
								<Segment>
									<Image id={article.source.id} src={article.urlToImage} />
									<h2> {article.source.name} </h2>
									<Header>{article.author} </Header>
									<h1> {article.title} </h1>
									<h3> {article.description} </h3>
									<h4> {article.content} </h4>
									<a href={article.url}>Full article</a>
									<Button id={article.source.id} data-index={i} color="yellow" onClick={this.deleteArticle}>Delete</Button>
								</Segment>
							</Grid.Column>
	  				</Grid>	
	  				<br/>
						<br/>
						<br/>
					</div>

    			)
    	})
        return(
        	<div>
            <h1> {this.state.user}'s articles </h1>
            {articles}
          </div>  
        )
    }
}
export default MyArticles;
