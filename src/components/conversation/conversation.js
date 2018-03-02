import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Statement from '../statement/statement';
import './conversation.css';

class Conversation extends Component {
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
    const statements = this.props.conversationQuery.Channel.Statements;

    return (
      <div className="conversation">
        <h2 className="conversation__title">
          {this.props.conversationQuery.Channel.title}
        </h2>
        <div className="conversation__thread">
          {statements.map(statement => (
            <Statement
              key={statement.id}
              name={statement.User.name}
              text={statement.text}
            />
          ))}
        </div>
        <div className="conversation__input">
          <input type="text" />
        </div>
      </div>
    );
  }
}

// const channelId = 1;

// Define the GraphQL query to get the conversation data
const CONVERSATION_QUERY = gql`
  query ConversationQuery {
    Channel(id: 1) {
      title
      Statements {
        id
        text
        User {
          name
        }
      }
    }
  }
`;

export default graphql(CONVERSATION_QUERY, {
  options: ({ channel }) => ({ variables: { channel } }),
  name: 'conversationQuery'
})(Conversation);
