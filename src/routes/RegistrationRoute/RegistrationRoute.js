import React, { Component } from 'react';

import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import './RegistrationRoute.css';

class RegistrationRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  handleRegistrationSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/';
    history.push(destination);
  };

  render() {
    return (
      <section className="reg-log-form">
        <p>
          Practice learning a language with the spaced reptition revision
          technique.
        </p>
        <h2>Sign up</h2>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  }
}

export default RegistrationRoute;
