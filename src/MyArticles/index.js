import React, { Component } from 'react';
import { Segment, Header, Grid, Image, Button } from 'semantic-ui-react'
import './styles.css'
class MyArticles extends Component {
	constructor(){
	    super();
	    this.state = {
	        articles: [],
	        user: '',
	        articleDeleted: ''
	    }
	}
	fetchArticles = async () => {
    try {
    	const response = await fetch('http://localhost:9292/api/user/articles', {
    		credentials: 'include'
    	})
    	
    	const parsedResponse = await response.json();
    	console.log(parsedResponse)
    	

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
	async deleteArticle(id) { console.log("deleteArticle, id is: ", id)
		// const userSearch = search
		// const response = await fetch('https://newsapi.org/v2/everything?q=' + userSearch +'&apiKey='+ apiKey)
		// const articleParsed = await response.json();
		const deleteArticle = await fetch('http://localhost:9292/api/user/article/' + id , {
			credentials: 'include',
			method: 'DELETE',
			body: JSON.stringify(id),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const parsed = await deleteArticle.json();
		console.log(parsed, 'this is parsed delete')
		if (parsed.status === 200) {
			// delete article from array

			this.setState({
				articleDeleted: parsed.article,
				message: parsed.message
			})
			this.fetchArticles()
			console.log(parsed.article, 'this is message parsed')
		}
		console.log(deleteArticle, 'this is delete article')

	
	}
	handleDelete = (e) => {
		const idx = e.currentTarget.dataset.index
		const myArticle = this.state.articles[idx]
		console.log(myArticle)
		this.deleteArticle(myArticle.id)
}
	componentDidMount(){
		this.fetchUser();
		this.fetchArticles();
	}
    render(){
    	console.log(this.deleteArticle)
    	const articles = this.state.articles.map((article, i) => {
    	const published = new Date(article.published_at)
  		const date = published.toLocaleDateString()
    		return (
  				<div key={i}>
						<Grid container columns={1} textAlign='center' vertical='middle' style={{height: '100%'}}>
	    				<Grid.Column style={{maxWidth: 600}}>
								<Segment>
									<Image id={article.source} src={article.img_url} />
									<h2> {article.source.name} </h2>
									<Header>{article.author} </Header>
									<h1> {article.title} </h1>
									<h3> {article.description} </h3>
									<h4> {article.content} </h4>
									<Button color="blue">
									<a className="article" href={article.article_url}>Full article</a>
									</Button>
									<Button id={article.id} data-index={i} color="red" onClick={this.handleDelete}>Delete</Button>
									<br/>
									<br/>
									<small> Published {date} </small>
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
            <div class="ui success message">
            	<i class="close icon"></i>
            	<div class="header">
            	<h1>{this.state.message}</h1>
            	</div>
            </div>
            <h1> {this.state.user}'s articles </h1>
            {articles}
            		
          </div>  
        )
    }
}
export default MyArticles;
