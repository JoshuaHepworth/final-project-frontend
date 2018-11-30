import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

const apiKey = 'c2060d4c459b4dc3ab9fe16b4b16c82c'

class SaveArticle extends Component {
	constructor(){
    super();
    this.state = {
        sourceId: '',
        user: '',
        description: '',
        imageUrl: '',
        title: '',
        author: '',
        name: '',
        article: []
    }
	}
	async handleSave(search) {
		const userSearch = search
		const response = await fetch('https://newsapi.org/v2/everything?q=' + userSearch +'&apiKey='+ apiKey)
		const articleParsed = await response.json();
		const saveArticle = await fetch('http://localhost:9292/api/article', {
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify({
				sourceId: articleParsed.source.id,
				article: saveArticle
			})
		})
		const parsed = await saveArticle.json();
		console.log(saveArticle, 'this is save article')
			this.setState({
				article: parsed.article
			})
	}
    render(){
    	console.log(this.handleSave, 'This is the handleSave')
        return(
            <Button color="yellow"onClick={this.handleSave}>Save</Button>
        )
    }
}
export default SaveArticle;
