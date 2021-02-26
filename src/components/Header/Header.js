import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import './Header.css';

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    return (
      <div>
        <nav>
          <Link
            className="myButton"
            onClick={this.handleLogoutClick}
            to="/login"
          >
            Logout
          </Link>
        </nav>
        <div className="header-username">
          Logged in as: <b>{this.context.user.name}</b>
        </div>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <nav>
        <Link to="/login">Login</Link> | <Link to="/register">Sign up</Link>
      </nav>
    );
  }

  render() {
    return (
      <header>
        <div>
          <img
            src="data:image/png;base64,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"
            alt="chat bubbles"
          />
          <span>
            <h1 className="cap">
              <Link to="/">Spaced repetition</Link>
            </h1>
            <br />
            <span>Learn to Speak German!</span>
          </span>
        </div>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header;
