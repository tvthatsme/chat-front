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
      selectedChannel: '',
      showMobileMenu: false
    };
  }

  /**
   * Toggle the state to show the channel menu on mobile
   */
  toggleMobileMenu() {
    this.setState({ showMobileMenu: !this.state.showMobileMenu });
  }

  /**
   *
   * @param {ID} channel Channel ID that is selected for viewing
   */
  setChannel(channel) {
    this.setState({
      selectedChannel: channel,
      showMobileMenu: false
    });
  }

  /**
   * Render the component
   */
  render() {
    return (
      <div className="chat">
        <div
          className={
            'chat__channels ' +
            (this.state.showMobileMenu ? 'chat__channels--show' : '')
          }
        >
          <Channels
            channel={this.state.selectedChannel}
            changeChannel={channel => this.setChannel(channel)}
          />
          <button
            class="chat__show-channels"
            onClick={e => this.toggleMobileMenu()}
          >
            &#9776;
          </button>
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
