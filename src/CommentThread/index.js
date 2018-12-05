import React, { Component } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react'

class CommentThread extends Component {
	constructor(){
	    super();
	    this.state = {
	        user: '',
	        comment: '',
	        articleComments: []
	        // article: {}
	    }
	}

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}

	async saveComment(comment, article) { console.log("saveComment", comment)

		console.log('here comes the body in save comment in comment thread')
		console.log({
				comment: comment,
				article: article
			})
		const saveComment = await fetch('http://localhost:9292/api/comment', {
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify({
				comment: comment,
				article: article
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const parsed = await saveComment.json();
		const newCommentArray = this.state.articleComments;
		newCommentArray.push(parsed.comment);
		console.log(parsed, 'this is parsed saveComment')
		if (parsed.status === 200) {
			this.setState({
				articleComments: newCommentArray,
				// article: this.props.article,
				message: parsed.message
			})
			console.log(parsed.comment, 'this is message parsed')
		}
	}


	handleSubmit = (e) => {
		const idx = this.props.articleUrl
		const myArticle = this.props.article
		const myComment = this.state.comment
		// console.log(myComment, 'THIS IS MY COMMENT!!!!!!')
		this.saveComment(myComment, myArticle)
	}
	fetchUser = async () => {
    try {
    	const currentUser = await fetch('http://localhost:9292/api/user', {
    		credentials: 'include'
    	})

    	const parsedUser = await currentUser.json();
    	console.log(parsedUser, "PARSED USER IN COMMENTS")

    	this.setState({
    		user: parsedUser.user.username
    	})

    } catch(err){
        return(err)
    }
		    
	}
	fetchArticleComments = async (id) => { 
	  try {
	  	const response = await fetch('http://localhost:9292/api/comment/article/' + id, {
	  		credentials: 'include'
	  	})
	  	// console.log(response, 'this is the response')
	  	const parsedResponse = await response.json();
			console.log(parsedResponse, ' THIS IS PARSED FROM ARTICLE COMMENTS')

	  	this.setState({
	  		articleComments: parsedResponse.comments
	  	})

	  } catch(err){
	      return(err)
	  }
		    
	}
	componentDidMount(){
		this.fetchUser();
		this.fetchArticleComments();
	}
  render(){
  	const comments = this.state.articleComments.map((comment, i) => {
  		return(
  			<div key={i}>
  				<Comment>
		      <Comment.Content>
		        <Comment.Author as='a'>{this.state.user}</Comment.Author>
		        <Comment.Metadata>
		          <div>5 days ago</div>
		        </Comment.Metadata>
		        <Comment.Text>{comments}</Comment.Text>
		        <Comment.Actions>
		          
		        </Comment.Actions>
		      </Comment.Content>
		    </Comment>
  			<h1>{comment.message}</h1>
  			</div>
  			)
  	})
  	console.log(this.state.user)
  	console.log(this.state.articleComments)

    return(

		  <Comment.Group>
		    <Header as='h3' dividing color="blue">
		      Comments Thread
		    </Header>
		    {comments}
		    <Form reply onSubmit={this.handleSubmit} id={this.props.articleUrl}>
		      <Form.TextArea value={this.state.comment} onSubmit={this.handleSubmit} id={this.props.articleUrl} name="comment" placeholder="Comment..." onChange={this.handleChange}/>
		      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
		    </Form>
		  </Comment.Group>
    )
  }
}
export default CommentThread;
