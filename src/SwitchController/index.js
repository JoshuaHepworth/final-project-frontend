import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import MyComments from '../MyComments'
import MyArticles from '../MyArticles'
import MainContainer from '../MainContainer'

class SwitchController extends Component {
    render(){
        return(
        	<div>
            <Switch>
		          <Route exact path="/mycomments" component={MyComments}/>
		          <Route exact path="/myarticles" component={MyArticles}/>
		        </Switch>
		      </div>
        )
    }
}
export default SwitchController;
