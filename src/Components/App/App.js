import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import ArticlePage from '../../Routes/ArticlePage/ArticlePage';
import AuthorPage from '../../Routes/AuthorPage/AuthorPage';
// import BookmarksPage from '../../Routes/BookmarksPage/BookmarksPage';
import LoginPage from '../../Routes/LoginPage/LoginPage';
import MainPage from '../../Routes/MainPage/MainPage';
import PostArticlePage from '../../Routes/PostArticlePage/PostArticlePage';
import ProfilePage from '../../Routes/ProfilePage/ProfilePage';
// import ResultsPage from '../../Routes/ResultsPage/ResultsPage';
import SignUpPage from '../../Routes/SignUpPage/SignUpPage';
import UploadImagePage from '../../Routes/UploadImagePage/UploadImagePage';
import EditProfilePage from '../../Routes/EditProfilePage/EditProfilePage';

import TokenService from '../../Services/token-service';
import AuthApiService from '../../Services/auth-api-service';
import IdleService from '../../Services/idle-service';
import AuthorApiService from '../../Services/author-api-service';

import ArticleContext from '../../Contexts/ArticleContext';

import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicRoute';

class App extends Component {

  static contextType = ArticleContext;

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      error: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { error: true };
  }

  componentDidMount() {
    localStorage.clear();
    IdleService.setIdleCallback(this.logoutFromIdle);
    if (TokenService.hasAuthToken()) {
      IdleService.regiserIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        AuthApiService.postRefreshToken();
      });
      AuthorApiService.getLoggedInAuthor()
        .then(this.context.setUser)
        .catch(this.context.setError);
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets();
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.forceUpdate();
  }

  render() {
    console.log('context', this.context);
        
    return (
      <>
        <Header />
        <main>
          {this.state.error && <p className="error">There was an error.</p>}
          <Switch>
            <Route 
              exact path={"/"}
              component={MainPage}
            />
            <Route 
              path="/article/:articleId"
              component={ArticlePage}
            />
            <Route 
              path="/author/:username"
              component={AuthorPage}
            />
            <PublicOnlyRoute 
              path="/login"
              component={LoginPage}
            />
            <PublicOnlyRoute 
              path="/register"
              component={SignUpPage}
            />
            <PrivateRoute
              path="/profile/:username"
              component={ProfilePage}
            />
            <PrivateRoute 
              path="/post"
              component={PostArticlePage}
            />
            <PrivateRoute 
              path="/upload/:articleId"
              component={UploadImagePage}
            />
            <PrivateRoute 
              path="/editprofile/:username"
              component={EditProfilePage}
            />
            {/*<Route 
              path="/results"
              component={ResultsPage}
            /> */}
            
            {/* <PrivateRoute 
              path="/bookmarks"
              component={BookmarksPage}
            /> */}
          </Switch>
        </main>
      </>
    );
  }
}

export default withRouter(App);