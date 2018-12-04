import React, { Component } from 'react';
import ArticleList from '../ArticleList'
import {Button} from 'semantic-ui-react'
class ArticleView extends Component {
	constructor(){
	    super();
	    this.state = {
	        // showArticle: true
	    }
	}
    render(){
    	console.log(this.props.showArticle, 'this is show article')
        return(
        	<div>
            <h1>ArticleView</h1>
         
          </div>  
        )
    }
}
export default ArticleView;
