import React, { Component } from 'react';
import ChannelList from '../channel-list/channel-list';
import './channels.css';

class Channels extends Component {
  /**
   * Render the channel sidebar component
   */
  render() {
    return (
      <div className="channels">
        <h2>Channels</h2>
        <button className="channels__add">+</button>
        <ChannelList
          channel={this.props.channel}
          changeChannel={channel => this.props.changeChannel(channel)}
        />
      </div>
    );
  }
}

export default Channels;
