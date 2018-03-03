import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Statement from '../statement/statement';
import InputStatement from '../input-statement/input-statement';
import './conversation.css';

class Conversation extends Component {
  /**
   * Render the component
   */
  render() {
    // Store the data returned from the query
    const data = this.props.conversationQuery;

    // Loading state
    if (data && data.loading) {
      return <div>Loading</div>;
    }

    // Error state
    if (data && data.error) {
      return <div>Error</div>;
    }

    // Store the statements
    const statements = data.statements;

    const users = data.users;

    // Store the channel details
    const channel = data.channel;

    // TODO: Creating a better GraphQL query would eliminate this mess
    const fullStatements = statements.map(statement => {
      let state = Object.assign({}, statement);
      const user = users.filter(user => user.id === state.userId);
      if (user.length) {
        state.name = user[0].nickname;
      }
      return state;
    });

    return (
      <div className="conversation">
        <h2 className="conversation__title">
          {channel !== null ? channel.title : 'Select or create a channel...'}
        </h2>
        <div className="conversation__thread">
          {fullStatements.map(statement => (
            <Statement
              key={statement.id}
              name={statement.name}
              text={statement.text}
            />
          ))}
        </div>
        <InputStatement
          channel={this.props.channel}
          userId={this.props.userId}
        />
      </div>
    );
  }
}

// Define the GraphQL query to get the conversation data
const CONVERSATION_QUERY = gql`
  query ConversationQuery($channel: ID!) {
    channel(where: { id: $channel }) {
      title
    }
    statements(where: { channelId: $channel }) {
      text
      id
      createdAt
      userId
    }
    users {
      id
      nickname
    }
  }
`;

export default graphql(CONVERSATION_QUERY, {
  options: ({ channel }) => ({ variables: { channel } }),
  name: 'conversationQuery'
})(Conversation);
