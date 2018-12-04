import React, { Component } from 'react';
import HeaderApp from '../HeaderApp'
import {Route, Switch} from 'react-router-dom'
import MyComments from '../MyComments'
import MyArticles from '../MyArticles'
import ArticleList from '../ArticleList'

import ArticleView from '../ArticleView'

const apiKey = '46a2cf77ab8f462c903e3536c6e7502b'

const MainContainer = (props) => {

    return(
    	<div>

    		<HeaderApp Logout={props.Logout}/>
    		
				<Switch>
          <Route exact path="/article" component={ArticleView}/>
          <Route exact path="/mycomments" component={MyComments}/>
          <Route exact path="/myarticles" component={MyArticles}/>
          <Route exact path="/home" component={ArticleList}/>
        </Switch>
      </div>
    )
  
}
export default MainContainer;
