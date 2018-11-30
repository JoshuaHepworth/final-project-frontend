import React, { Component } from 'react';
import HeaderApp from '../HeaderApp'
import { Segment, Header, Grid, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {Route, Switch} from 'react-router-dom'
import MyComments from '../MyComments'
import MyArticles from '../MyArticles'
import ArticleList from '../ArticleList'
import SwitchController from '../SwitchController'
import Search from '../Search'
import SaveArticle from '../SaveArticle'

const apiKey = 'c2060d4c459b4dc3ab9fe16b4b16c82c'

const MainContainer = (props) => {

    return(
    	<div>

    		<HeaderApp Logout={props.Logout}/>
    		
				<Switch>
          <Route exact path="/mycomments" component={MyComments}/>
          <Route exact path="/myarticles" component={MyArticles}/>
          <Route exact path="/home" component={ArticleList}/>
        </Switch>
      </div>
    )
  
}
export default MainContainer;
