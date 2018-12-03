import React, { Component } from 'react';
import HeaderApp from '../HeaderApp'
import { Segment, Header, Grid, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {Route, Switch} from 'react-router-dom'
import MyComments from '../MyComments'
import MyArticles from '../MyArticles'
import SwitchController from '../SwitchController'
import Search from '../Search'
import SaveArticle from '../SaveArticle'
import './styles.css'

const apiKey = 'c2060d4c459b4dc3ab9fe16b4b16c82c'

class ArticleList extends Component {
	constructor(){
	    super();
	    this.state = {
        // sourceId: '',
        // user: '',
        // description: '',
        // imageUrl: '',
        // title: '',
        // author: '',
        // name: '',
        articles: [],
        savedArticles: [],
        message: ''
	    }
	}
	async fetchArticles() {
		const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey='+ apiKey)
		const parsed = await response.json();
		console.log(parsed.articles)
		this.setState({
			articles: parsed.articles
		})
	}

	async fetchArticlesSearched(search) {
		const userSearch = search
		const response = await fetch('https://newsapi.org/v2/everything?q=' + userSearch+'&apiKey='+ apiKey)
		const parsed = await response.json();
		console.log(userSearch)
			this.setState({
				articles: parsed.articles
			})
	}
	async saveArticle(article) { console.log("saveArticle", article)
		// const userSearch = search
		// const response = await fetch('https://newsapi.org/v2/everything?q=' + userSearch +'&apiKey='+ apiKey)
		// const articleParsed = await response.json();
		const saveArticle = await fetch('http://localhost:9292/api/article', {
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify(article),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const parsed = await saveArticle.json();
			if (parsed.status === 200) {
			this.setState({
				message: parsed.message,
			})
			console.log(parsed.article, 'this is message parsed')
		}
		console.log(saveArticle, 'this is save article')

	
	}
	handleSave = (e) => {
		const idx = e.currentTarget.dataset.index
		const myArticle = this.state.articles[idx]
		console.log(myArticle)
		this.saveArticle(myArticle)
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
  								<Button id={article.source.id} data-index={i} color="yellow" onClick={this.handleSave}>Save</Button>
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
    		<Search getResults={this.getResults} />
    		<h1 className="saved">{this.state.message}</h1>
     	  <h1> Top Headlines </h1>
        {articleList}
      </div>
    )
  }
}
export default ArticleList;
