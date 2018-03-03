import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class InputStatement extends Component {
  /**
   * Constructor for the input statement component
   */
  constructor() {
    super();

    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.listenForEnter = this.listenForEnter.bind(this);
  }

  /**
   * Update the value of the controlled input field
   *
   * @param {Event} event
   */
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  /**
   * Listen for enter key and fire save if so
   *
   * @param {Event} event
   */
  listenForEnter(event) {
    if (event.keyCode === 13) {
      this.sendStatement(event.target.value);
    }
  }

  /**
   * Send the new statement to the database
   */
  sendStatement = async statement => {
    const { channel, userId } = this.props;
    await this.props.createStatement({
      variables: {
        userId,
        text: statement,
        channel
      }
    });
    this.setState({ value: '' });
  };

  /**
   * Render the component
   */
  render() {
    return (
      <div className="conversation__input">
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          onKeyDown={this.listenForEnter}
        />
      </div>
    );
  }
}

// Define the GraphQL Schema for the statement mutation
const STATEMENT_MUTATION = gql`
  mutation CreateStatement($userId: ID!, $text: String!, $channel: ID!) {
    createStatement(
      data: { userId: $userId, text: $text, channelId: $channel }
    ) {
      id
    }
  }
`;

export default graphql(STATEMENT_MUTATION, {
  name: 'createStatement'
})(InputStatement);
