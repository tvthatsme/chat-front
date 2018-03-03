import React, { Component } from 'react';
import Channels from '../channels/channels';
import Conversation from '../conversation/conversation';
import './chat.css';

class Chat extends Component {
  /**
   * Constructor for the chat component
   */
  constructor() {
    super();

    this.state = {
      selectedChannel: ''
    };
  }

  /**
   * Render the component
   */
  render() {
    return (
      <div className="chat">
        <div className="chat__channels">
          <Channels
            channel={this.state.selectedChannel}
            changeChannel={channel =>
              this.setState({ selectedChannel: channel })
            }
          />
        </div>
        <div className="chat__conversation">
          <Conversation
            channel={this.state.selectedChannel}
            userId={this.props.userId}
          />
        </div>
      </div>
    );
  }
}

export default Chat;
