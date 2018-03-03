import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
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
   * Send the user muation to the database and call the parent
   * method to set the new user
   */
  registerNickname = async () => {
    const nickname = this.state.nickname;
    const result = await this.props.userMutation({
      variables: {
        nickname
      }
    });
    this.props.setNickname(result.data.createUser.id);
  };

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
          <form
            className="register__inputs"
            onSubmit={e => this.registerNickname()}
          >
            <input
              type="text"
              onChange={event => this.handleChange(event.target.value)}
            />
            <input type="submit" value="Enter" />
          </form>
        </div>
      </div>
    );
  }
}

// Define the GraphQL Schema for the user mutation
const USER_MUTATION = gql`
  mutation UserMutation($nickname: String!) {
    createUser(data: { nickname: $nickname }) {
      id
    }
  }
`;

export default graphql(USER_MUTATION, { name: 'userMutation' })(Register);
