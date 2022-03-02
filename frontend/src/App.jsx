import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AppLogin from './components/login';
import Content from './components/Content';
import Loader from "./components/loader";
import { verifyToken } from './api';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loading: true,
      isLogged: false
    }
  }

  logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
  login = (token) => {
    this.setState({
      isLogged: true,
      token
    })
    window.location.href = "/";
  }

  render() {

    if (this.state.loading) {
      return (
        <div id="app">
          <Loader></Loader>
        </div>
      )
    }

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/login"}
              render={props => (
                <AppLogin
                  {...props} login={this.login} isLogged={this.state.isLogged} loggedOutStatus={this.state.loggedOutStatus} />
              )}
            />
            <Route
              path={"/"}
              render={props => (
                <Content
                  {...props} user={this.state.user} isLogged={this.state.isLogged} logout={this.logout} loggedOutStatus={this.state.loggedOutStatus} />
              )}
            />

          </Switch>
        </BrowserRouter>
      </div>
    );
  }

  componentDidMount() {
    const token = localStorage.getItem("token");

    if (!token) {
      this.setState({
        loading: false,
        isLogged: false
      })
    }

    verifyToken(token).then(result => {
      if (result.ok) {
        this.setState({
          token,
          isLogged: true,
          user: result.user,
          loading: false
        });
      } else {
        this.setState({
          loading: false,
          isLogged: false
        });
      }
    })

  }

}

export default App;