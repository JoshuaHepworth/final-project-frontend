import React, { Component } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react'

class CommentThread extends Component {
	constructor(){
	    super();
	    this.state = {
	        user: '',
	        comment: '',
	        articleComments: [],
	        commentAuthor: ''
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
		console.log(parsed)
		const newCommentArray = this.state.articleComments;
		// the TIME STAMP IS NULL IN THE PARSED.COMMENTS
		console.log(parsed.comment, " THIS IS THE NEW COMMENT ARRAY")
		newCommentArray.push(parsed.comment);
		console.log(parsed, 'this is parsed saveComment')
		if (parsed.status === 200) {
			this.setState({
				articleComments: newCommentArray,
				// commentAuthor: parsed.user.username,
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
    		// commentAuthor: parsedUser.comments.message
    		// commentAuthor: parsedUser.user.comments
    	})

    } catch(err){
        return(err)
    }
		    
	}
	fetchArticleComments = async (articleUrl) => { 
	  try {
	  	const response = await fetch('http://localhost:9292/api/comment/article', {
	  		method: 'POST',
	  		credentials: 'include',
	  		body: JSON.stringify({
	  			url: articleUrl
	  		}),
	  		headers: {
	  			"Content-Type": 'application/json'
	  		}
	  	})
	  	// console.log(response, 'this is the response')
	  	const parsedResponse = await response.json();
			console.log(parsedResponse, ' THIS IS PARSED FROM ARTICLE COMMENTS')

	  	console.log(parsedResponse.comments, ' THESE. ARE THE COMMENTS PARSED IN GET')
	  	this.setState({
	  		articleComments: parsedResponse.comments
	  	})

	  } catch(err){
	      return(err)
	  }
		    
	}
	componentDidMount(){
		this.fetchUser();
		this.fetchArticleComments(this.props.articleUrl);
	}
  render(){
  	console.log(this.state.commentAuthor, ' THIS IS THE AUTHOR')
  	const comments = this.state.articleComments.map((comment, i) => {
  		console.log(comment, "THIS IS COMMENTS IN RENDER")
  		const published = new Date(comment.comment.ts)
  		const date = published.toLocaleDateString()
  		// console.log(this.state.commentAuthor, 'this is the author!')
  		return(
  			<div key={i}>
  				<Comment>
		      <Comment.Content>
		        <Comment.Author as='a'>{comment.username}</Comment.Author>
		        <Comment.Metadata>
		          <div>{date}</div>
		        </Comment.Metadata>
		        <Comment.Text>{comment.comment.message}</Comment.Text>
		        <Comment.Actions>
		          
		        </Comment.Actions>
		      </Comment.Content>
		    </Comment>
  			<h1></h1>
  			</div>
  		)
  	})
  	console.log(this.state.user)
  	console.log(this.state.articleComments)

    return(

		  <Comment.Group>
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
