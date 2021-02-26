import React, { Component } from 'react';
import UserApiService from '../../services/user-api-service';
import images from '../../assets/images/images';
import { Link } from 'react-router-dom';

import './DashboardRoute.css';

class DashboardRoute extends Component {
  state = {
    words: [],
    language: [],
  };

  async componentDidMount() {
    this.props.handleToggleLoading();
    UserApiService.getUserLanguage()
      .then((res) => {
        this.setState({ words: res.words, language: res.language });
        this.props.handleToggleLoading();
      })
      .catch((error) => {
        this.setState({ error: error.message });
        this.props.handleToggleLoading();
      });
  }

  render() {
    const english_words = this.state.words.map((word, idx) => {
      return (
        <li key={idx}>
          <h4>{word.original}</h4> |{' '}
          <span className="cap">{word.translation}</span>
          <br />
          <div className="scoreCounts">
            <div className="cap">
              <img src={images.good} alt="thumbs up" />
              correct answer count:{' '}
              <span className="cap correct-style">{word.correct_count}</span>
            </div>
            <div className="cap">
              <img src={images.bad} alt="thumbs down" />
              incorrect answer count:{' '}
              <span className="cap incorrect-style">
                {word.incorrect_count}
              </span>
            </div>
          </div>
        </li>
      );
    });
    return (
      <section className="dash">
        <div className="scoreCard">
          <img
            src="data:image/png;base64,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"
            alt="clipboard icon"
          />
          <span className="cap"> Total correct answers:</span>{' '}
          <span>{this.state.language.total_score}</span>
        </div>
        <p>Track your progress!</p>
        <div className="sub-header">
          <h2>Let's Learn some {this.state.language.name}!</h2>
        </div>
        <div className="button-wrapper">
          <Link to="/learn">
            <div className="myButton cap practice-button">Start practicing</div>
          </Link>
        </div>
        <div>
          <div>
            <h3 className="cap">Words to practice</h3>

            <div className="dash-list">
              <div className="words">
                <ol>{english_words}</ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default DashboardRoute;
