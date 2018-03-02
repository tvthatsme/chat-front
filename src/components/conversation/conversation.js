import React, { Component } from 'react';
import Statement from '../statement/statement';
import './conversation.css';

class Conversation extends Component {
  /**
   * Render the component
   */
  render() {
    return (
      <div className="conversation">
        <h2 className="conversation__title">Conversation Title</h2>
        <div className="conversation__thread">
          <Statement name="Timothy" text="Well hello there" />
          <Statement name="Scott" text="hey, welcome to the chat" />
        </div>
        <div className="conversation__input">
          <input type="text" />
        </div>
      </div>
    );
  }
}

export default Conversation;
