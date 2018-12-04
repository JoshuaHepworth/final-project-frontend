import React, { Component } from 'react';
import { Modal, Header, Image, Grid, Segment } from 'semantic-ui-react';
import './styles.css'
import CommentThread from '../CommentThread'


class ArticleModal extends Component {

	closeModal = () => {
		this.props.closeModal()
	}

    render(){
    	console.log(this.props.articleForModal, 'this is articleForModal')
        return(
 
            <Modal open={this.props.open}>
            	<Modal.Content>
            	<p className="close" onClick={this.closeModal}>+</p>
		  					<Grid container columns={1} textAlign='center' vertical='middle' style={{height: '100%'}}>
		      				<Grid.Column style={{maxWidth: 600}}>
		  							<Segment>
		  								<Image id={this.props.articleForModal} src={this.props.articleForModal.urlToImage}/>
		  								<Header>{this.props.articleForModal.author} </Header>
		  								<h1> {this.props.articleForModal.title} </h1>
		  								<h3> {this.props.articleForModal.description} </h3>
		  								<h4> {this.props.articleForModal.content} </h4>
		  								<div class="scrolling content">
		  								<CommentThread />
		  								</div>
		  							</Segment>
		  						</Grid.Column>
		    				</Grid>	 
	      			</Modal.Content>
	      			</Modal>
	      			
        			
  				
      	)
    }
}
export default ArticleModal;
