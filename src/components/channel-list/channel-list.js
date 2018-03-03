import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class ChannelList extends Component {
  /**
   * Render the list of channels or any error/loading state
   */
  render() {
    // Loading state
    if (this.props.channelsQuery && this.props.channelsQuery.loading) {
      return <div className="channels__no-list">Loading...</div>;
    }

    // Error state
    if (this.props.channelsQuery && this.props.channelsQuery.error) {
      return <div className="channels__no-list">Error</div>;
    }

    // Store the channels
    const channels = this.props.channelsQuery.channels;

    // Render all the channels
    return (
      <ul className="channels__list">
        {channels.map(channel => (
          <li
            className={
              'channels__item ' +
              (channel.id === this.props.channel
                ? 'channels__item--selected'
                : '')
            }
            key={channel.id}
            onClick={e => this.props.changeChannel(channel.id)}
          >
            {channel.title}
          </li>
        ))}
      </ul>
    );
  }
}

// Define the GraphQL query to get all the channels
const CHANNELS_QUERY = gql`
  query ChannelsQuery {
    channels {
      id
      title
    }
  }
`;

export default graphql(CHANNELS_QUERY, { name: 'channelsQuery' })(ChannelList);
