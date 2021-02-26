import React, { Component } from 'react';
import UserApiService from '../../services/user-api-service';
import Button from '../../components/Button/Button';
import { Input, Label, Required } from '../../components/Form/Form';
import './LearningRoute.css';

class LearningRoute extends Component {
  state = {
    error: null,
    data: [],
    submitted: false,
    guess: '',
    nextWord: '',
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.props.handleToggleLoading();
    let { guess } = ev.target;
    this.setState({ error: null, nextWord: this.state.data.nextWord });
    guess = guess.value.toLowerCase();
    UserApiService.postUserGuess(guess)
      .then((res) => {
        this.setState({ data: res, guess, submitted: true });
        this.props.handleToggleLoading();
      })
      .catch((error) => {
        this.setState({ error: error.message });
        this.props.handleToggleLoading();
      });
  };

  async componentDidMount() {
    UserApiService.getUserNextWord()
      .then((res) => {
        this.setState({ data: res });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  render() {
    console.log(this.props);
    const guess = this.state.guess;
    const error = this.state.error;
    return (
      <>
        {!this.state.submitted && (
          <div className="learn-container">
            <div className="center">
              <h2>Translate the word:</h2>
              <span>{this.state.data.nextWord}</span>
              <br />
              <p>
                Your total score is: <span>{this.state.data.totalScore}</span>
              </p>
            </div>
            <form
              action="#"
              id="learn_form"
              onSubmit={(ev) => {
                this.handleSubmit(ev);
              }}
            >
              <div role="alert">{error && <p>{error}</p>}</div>
              <div>
                <Label htmlFor="learn-guess-input">
                  What's the translation for this word?
                </Label>
                <Required />
                <br />
                <Input id="learn-guess-input" name="guess" required />
              </div>
              <footer>
                <div className="button-wrapper">
                  <Button className="submit myButton cap" type="submit">
                    Submit your answer
                  </Button>
                </div>
              </footer>
            </form>
            <div className="center">
              <div>
                You have answered this word correctly{' '}
                <span className="correct-style">
                  {this.state.data.wordCorrectCount}
                </span>{' '}
                times.
                <br />
                You have answered this word incorrectly{' '}
                <span className="incorrect-style">
                  {this.state.data.wordIncorrectCount}
                </span>{' '}
                times.
              </div>
            </div>
          </div>
        )}
        {this.state.submitted && (
          <div className="learn-container">
            <div className="center">
              {this.state.data.isCorrect ? (
                <h2 className="correct bounce-animate">You were correct! :D</h2>
              ) : (
                <h2 className="incorrect rotate-animate">
                  Good try, but not quite right :(
                </h2>
              )}

              <div className="DisplayScore">
                <p>
                  Your total score is: <span>{this.state.data.totalScore}</span>
                </p>
              </div>
            </div>

            <div className="DisplayFeedback center">
              <p>
                The correct translation for{' '}
                <span className="cap">{this.state.nextWord}</span> was{' '}
                <span className="cap">{this.state.data.answer}</span> and you
                chose <span className="cap">{guess}</span>!
              </p>
            </div>
            <footer>
              <div className="button-wrapper">
                <Button
                  onClick={() => this.setState({ submitted: false })}
                  className="submit myButton cap"
                  type="submit"
                >
                  Try another word!
                </Button>
              </div>
            </footer>
          </div>
        )}
      </>
    );
  }
}

export default LearningRoute;
