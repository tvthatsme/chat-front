import React, { Component } from 'react';
import './register.css';

class Register extends Component {
  /**
   * Constructor for the registration screen
   */
  constructor() {
    super();

    this.state = {
      nickname: ''
    };
  }

  /**
   * Handle change to the nickname input field
   *
   * @param {String} value
   */
  handleChange(value) {
    this.setState({ nickname: value });
  }

  /**
   * Render the component
   */
  render() {
    return (
      <div className="register">
        <div className="register__info">
          <h1>Register to start</h1>
        </div>
        <div className="register__form">
          <p>Please choose a nickname to identify yourself.</p>
          <div className="register__inputs">
            <input
              type="text"
              onChange={event => this.handleChange(event.target.value)}
            />
            <input
              type="submit"
              value="Enter"
              onClick={e => this.props.setNickname(this.state.nickname)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
