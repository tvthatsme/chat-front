import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Statement from '../statement/statement';
import './conversation.css';

class Conversation extends Component {
  handleInput(event) {
    if (event.keyCode === 13) {
      console.log(event.target.value);
    }
  }

  sendStatement = async () => {};

  /**
   * Render the component
   */
  render() {
    // Loading state
    if (this.props.conversationQuery && this.props.conversationQuery.loading) {
      return <div>Loading</div>;
    }

    // Error state
    if (this.props.conversationQuery && this.props.conversationQuery.error) {
      return <div>Error</div>;
    }

    // Store the statements
    const statements = this.props.conversationQuery.statements;

    return (
      <div className="conversation">
        <h2 className="conversation__title">
          {this.props.conversationQuery.channel.title}
        </h2>
        <div className="conversation__thread">
          {statements.map(statement => (
            <Statement
              key={statement.id}
              // name={statement.User.name}
              text={statement.text}
            />
          ))}
        </div>
        <div className="conversation__input">
          <input type="text" onKeyUp={e => this.handleInput(e)} />
        </div>
      </div>
    );
  }
}

// const STATEMENT_MUTATION = gql`
//   mutation StatementMutation($user: Int!, $text: String!) {
//     createStatement(id: 8, user_id: $user, channel_id: 1, text: $text) {
//       id
//     }
//   }
// `;

// mutation {
//   createStatement(id: 8, user_id: 123, channel_id: 1, text: "Hello") {
//     id
//   }

// Define the GraphQL query to get the conversation data
const CONVERSATION_QUERY = gql`
  query ConversationQuery($channel: ID!) {
    channel(where: { id: $channel }) {
      title
    }
    statements(where: { channelId: $channel }) {
      text
      id
    }
  }
`;

export default graphql(CONVERSATION_QUERY, {
  options: ({ channel }) => ({ variables: { channel } }),
  name: 'conversationQuery'
})(Conversation);
