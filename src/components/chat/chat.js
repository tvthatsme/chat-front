import React, { Component } from 'react';
import Channels from '../channels/channels';
import Conversation from '../conversation/conversation';
import './chat.css';

class Chat extends Component {
  constructor() {
    super();

    this.state = {
      selectedChannel: 'cjeb0urp6003i01416ycy2ypr'
    };
  }

  changeChannel(channelId) {
    console.log(`change the channel to ${channelId}`);
  }

  /**
   * Render the component
   */
  render() {
    console.log(this.state.selectedChannel);
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
          <Conversation channel={this.state.selectedChannel} />
        </div>
      </div>
    );
  }
}

export default Chat;
