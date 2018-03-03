import React, { Component } from 'react';
import ChannelList from '../channel-list/channel-list';
import InputChannel from '../input-channel/input-channel';
import './channels.css';

class Channels extends Component {
  /**
   * Constructor for the channels component
   */
  constructor() {
    super();

    this.state = {
      showAddChannel: false
    };
  }

  /**
   * Handle the internal state and pass the new channel id
   * to the parent
   *
   * @param {String} channel Id of the newly created channel
   */
  handleChannelCreate(channel) {
    this.setState({ showAddChannel: false });
    this.props.changeChannel(channel);
  }

  /**
   * Render the channel sidebar component
   */
  render() {
    return (
      <div className="channels">
        <h2>Channels</h2>
        <button
          className="channels__add"
          onClick={e => this.setState({ showAddChannel: true })}
        >
          +
        </button>
        <ChannelList
          channel={this.props.channel}
          changeChannel={channel => this.props.changeChannel(channel)}
        />
        <div
          className={
            'channels__add-screen ' +
            (this.state.showAddChannel
              ? 'channels__add-screen--visible'
              : 'channels__add-screen--not-visible')
          }
        >
          <button
            className="channels__close-add"
            onClick={e => this.setState({ showAddChannel: false })}
          >
            Esc
          </button>
          <InputChannel
            channelCreated={channelId => this.handleChannelCreate(channelId)}
          />
        </div>
      </div>
    );
  }
}

export default Channels;
