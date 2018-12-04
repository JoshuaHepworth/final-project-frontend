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
import ArticleView from '../ArticleView'
import ArticleModal from '../ArticleModal'
import './styles.css'

const apiKey = '46a2cf77ab8f462c903e3536c6e7502b'

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
        articleUrl: '',
        savedArticles: [],
        message: '',
        activity: '',
        showArticle: false,
        showModal: false,
        articleForModal: []
	    }
	}
	fix = () => {
		this.setState({
			showArticle: false
		})
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
	handleModal = (e) => {
		const idx = e.currentTarget.dataset.index
		const myArticle = this.state.articles[idx]
		// console.log(myArticle)
		this.setState({
			showModal: true,
			articleForModal: myArticle
		})
	}
	closeModal = () => {
		this.setState({
			showModal: false
		})
	}
	displayArticle = () => {
		this.setState({
			showArticle: true
		})
	}
  render(){
  	console.log(this.state.articleForModal, 'this is article for modal')
  	const articleList = this.state.articles.map((article, i) => {
  		const published = new Date(article.publishedAt)
  		const date = published.toLocaleDateString()
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
  								<div class="ui buttons">
  								<Button class="ui button"id={article.source.id} data-index={i} color="yellow" onClick={this.handleSave}>Save</Button>
  								<div class="or"></div>
  								<a class="item">
							    <i class="icon mail"></i>
							    <div class="floating ui red label">Activity</div>
							 		</a>
							  	</div>
							  		<Button id={article.source.id} data-index={i}onClick={this.handleModal}color="blue" class="ui button">
  									View
  									</Button>
  									
  								
  								<h4> {date}</h4>
  								<small>Check out the full article</small>
  								<a className="link" href={article.url}> Here</a>
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
    	<ArticleModal articleForModal={this.state.articleForModal} handleModal={this.handleModal} closeModal={this.closeModal} open={this.state.showModal}/>
    		{ !this.state.showArticle ?
    		<div>
    		<Search getResults={this.getResults} />

	    		<div color="orange" class="ui success message">
	    			<h1>{this.state.message}</h1>
	        </div>
	            		
	     	  <h1> Top Headlines </h1>

	     	  {articleList} 
     	  </div>
     	: <ArticleView fix={this.fix} showArticle={this.state.showArticle}  />}
     	<Link to='/article'></Link>
     	  
     	 </div>

    )
  }
}
export default ArticleList;
