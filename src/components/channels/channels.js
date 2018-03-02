import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './channels.css';

class Channels extends Component {
  /**
   * Render the component
   */
  render() {
    // Loading state
    if (this.props.channelsQuery && this.props.channelsQuery.loading) {
      return <div>Loading</div>;
    }

    // Error state
    if (this.props.channelsQuery && this.props.channelsQuery.error) {
      return <div>Error</div>;
    }

    // Store the channels
    const channels = this.props.channelsQuery.allChannels;

    // Render all the channels
    return (
      <div className="channels">
        <h2>Channels</h2>
        <ul className="channels__list">
          {channels.map(channel => (
            <li className="channels__item" key={channel.id}>
              {channel.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// Define the GraphQL query to get all the channels
const CHANNELS_QUERY = gql`
  query ChannelsQuery {
    allChannels {
      id
      title
    }
  }
`;

export default graphql(CHANNELS_QUERY, { name: 'channelsQuery' })(Channels);
