import React, { Component } from 'react';
import Channels from '../channels/channels';
import Conversation from '../conversation/conversation';
import './chat.css';

class Chat extends Component {
  /**
   * Render the component
   */
  render() {
    return (
      <div className="chat">
        <div className="chat__channels">
          <Channels />
        </div>
        <div className="chat__conversation">
          <Conversation channel={1} />
        </div>
      </div>
    );
  }
}

export default Chat;
