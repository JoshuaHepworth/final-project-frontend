import React, { Component } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react'

class CommentThread extends Component {
	constructor(){
	    super();
	    this.state = {
	        user: '',
	        comment: '',
	        articleComments: ''
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
		console.log(parsed, 'this is parsed saveComment')
		if (parsed.status === 200) {
			this.setState({
				comment: this.state.comment,
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
	  	const response = await fetch('http://localhost:9292/api/comment/article' + id, {
	  		credentials: 'include',
	  		body: JSON.stringify(id),
				headers: {
				'Content-Type': 'application/json'
				}
	  	})
	  	
	  	const parsedResponse = await response.json();
	  	console.log(parsedResponse, 'this is parsed response from comment fetch')
	  	

	  	this.setState({
	  		articleComments: parsedResponse.articles
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
  	console.log(this.state.comment, 'this is the state in comments thread')
    return(

		  <Comment.Group>
		    <Header as='h3' dividing color="blue">
		      Comments Thread
		    </Header>

		    <Comment>
		      
		      <Comment.Content>
		        <Comment.Author as='a'>Matt</Comment.Author>
		        <Comment.Metadata>
		          <div>Today at 5:42PM</div>
		        </Comment.Metadata>
		        <Comment.Text>How artistic!</Comment.Text>
		        <Comment.Actions>
		          
		        </Comment.Actions>
		      </Comment.Content>
		    </Comment>

		    <Comment>
		      
		      <Comment.Content>
		        <Comment.Author as='a'>Elliot Fu</Comment.Author>
		        <Comment.Metadata>
		          <div>Yesterday at 12:30AM</div>
		        </Comment.Metadata>
		        <Comment.Text>
		          <p>This has been very useful for my research. Thanks as well!</p>
		        </Comment.Text>
		        <Comment.Actions>
		          
		        </Comment.Actions>
		      </Comment.Content>
		      <Comment.Group>
		        <Comment>
		          
		          <Comment.Content>
		            <Comment.Author as='a'>Jenny Hess</Comment.Author>
		            <Comment.Metadata>
		              <div>Just now</div>
		            </Comment.Metadata>
		            <Comment.Text>Elliot you are always so right :)</Comment.Text>
		            <Comment.Actions>
		              
		            </Comment.Actions>
		          </Comment.Content>
		        </Comment>
		      </Comment.Group>
		    </Comment>

		    <Comment>
		      
		      <Comment.Content>
		        <Comment.Author as='a'>Joe Henderson</Comment.Author>
		        <Comment.Metadata>
		          <div>5 days ago</div>
		        </Comment.Metadata>
		        <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
		        <Comment.Actions>
		          
		        </Comment.Actions>
		      </Comment.Content>
		    </Comment>

		    <Form reply onSubmit={this.handleSubmit} id={this.props.articleUrl}>
		      <Form.TextArea value={this.state.comment} onSubmit={this.handleSubmit} id={this.props.articleUrl} name="comment" placeholder="Comment..." onChange={this.handleChange}/>
		      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
		    </Form>
		  </Comment.Group>
    )
  }
}
export default CommentThread;
