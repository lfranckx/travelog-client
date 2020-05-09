/*eslint semi: ["error", "always"]*/
import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
// import ArticlePage from '../../Routes/ArticlePage/ArticlePage';
// import AuthorPage from '../../Routes/AuthorPage/AuthorPage';
// import BookmarksPage from '../../Routes/BookmarksPage/BookmarksPage';
import LoginPage from '../../Routes/LoginPage/LoginPage';
import MainPage from '../../Routes/MainPage/MainPage';
// import PostArticlePage from '../../Routes/PostArticlePage/PostArticlePage';
// import ProfilePage from '../../Routes/ProfilePage/ProfilePage';
// import ResultsPage from '../../Routes/ResultsPage/ResultsPage';
import SignUpPage from '../../Routes/SignUpPage/SignUpPage';

import TokenService from '../../Services/token-service';
import AuthApiService from '../../Services/auth-api-service';
import IdleService from '../../Services/idle-service';

// import PrivateRoute from '../../Utils/PrivateRoute';
// import PublicRoute from '../../Utils/PublicRoute';

class App extends Component {
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

  stringifyArray(array) {
    let copiedObj = JSON.parse(JSON.stringify(array));
    return copiedObj;
  }

  render() {
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
              path="/login"
              component={LoginPage}
            />
            <Route 
              path="/register"
              component={SignUpPage}
            />
            {/* <Route 
              path="/article/:articleId"
              component={ArticlePage}
            /> */}
            {/* <Route 
              path="/results"
              component={ResultsPage}
            />
            <Route 
              path="/author"
              component={AuthorPage}
            />
            <Route 
              path="/bookmarks"
              component={BookmarksPage}
            />
            <Route 
              path="/post"
              component={PostArticlePage}
            />
            <Route
              path="/profile"
              component={ProfilePage}
            /> */}
          </Switch>
        </main>
      </>
    );
  }
}

export default withRouter(App);