import React, { Component } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react'

class CommentThread extends Component {
	constructor(){
	    super();
	    this.state = {
	        user: '',
	        comment: ''
	    }
	}

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
	async saveComment(comment) { console.log("saveComment", comment)
		// const userSearch = search
		// const response = await fetch('https://newsapi.org/v2/everything?q=' + userSearch +'&apiKey='+ apiKey)
		// const articleParsed = await response.json();
		const saveComment = await fetch('http://localhost:9292/api/comment', {
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify(comment),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const parsed = await saveComment.json();
			if (parsed.status === 200) {
			this.setState({
				message: parsed.message,
			})
			console.log(parsed.comment, 'this is message parsed')
		}
		console.log(saveComment, 'this is save article')

	
	}
	handleSubmit = (e) => {
		const idx = e.currentTarget.dataset.index
		const myArticle = this.state.comment
		console.log(myArticle)
		this.saveComment(myArticle)
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
	fetchComment = async () => {
		
	}
	componentDidMount(){
		this.fetchUser()
	}
    render(){
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

    <Form reply onSubmit={this.handleSubmit}>
      <Form.TextArea onChange={this.handleChange}/>
      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
    </Form>
  </Comment.Group>




        )
    }
}
export default CommentThread;
