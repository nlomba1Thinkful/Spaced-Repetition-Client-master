import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute';
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute';
import LoginRoute from '../../routes/LoginRoute/LoginRoute';
import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute';
import LearningRoute from '../../routes/LearningRoute/LearningRoute';
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute';
import images from '../../assets/images/images';

import './App.css';

export default class App extends Component {
  state = { hasError: false, loading: false };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  handleToggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  render() {
    const { hasError } = this.state;
    return (
      <div className="App">
        <Header />
        <main>
          {hasError && <p>There was an error! Oh no!</p>}
          {this.state.loading ? (
            <div className="fade-animate loading-img">
              <img src={images.loading} alt="colors rotating loading icon" />
            </div>
          ) : (
            <div className="loading-img-placeholder"></div>
          )}
          <Switch>
            <PrivateRoute
              exact
              path={'/'}
              component={DashboardRoute}
              handleToggleLoading={this.handleToggleLoading}
            />
            <PrivateRoute
              path={'/learn'}
              component={LearningRoute}
              handleToggleLoading={this.handleToggleLoading}
            />
            <PublicOnlyRoute path={'/register'} component={RegistrationRoute} />
            <PublicOnlyRoute path={'/login'} component={LoginRoute} />
            <Route component={NotFoundRoute} />
          </Switch>
        </main>
      </div>
    );
  }
}
