import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class InputChannel extends Component {
  /**
   * Constructor for the input channel component
   */
  constructor() {
    super();

    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Respond to the input field onChange event by updating
   * the internal state of the input
   *
   * @param {Event} event event triggered by onChange
   */
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  /**
   * Send the new channel to the database and then
   * call the parents method to acknowledge the new channel
   *
   * @param {Event} event event triggered by form submit
   */
  handleSubmit = async event => {
    event.preventDefault();
    const returnVal = await this.props.createChannel({
      variables: {
        title: this.state.value
      }
    });
    this.setState({ value: '' });
    this.props.channelCreated(returnVal.data.createChannel.id);
  };

  /**
   * Render the component
   */
  render() {
    return (
      <form className="channels__add-form" onSubmit={this.handleSubmit}>
        <h1>Add Channel</h1>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <input type="submit" value="Add Channel" />
      </form>
    );
  }
}

// Define the GraphQL Schema for the channel mutation
const CHANNEL_MUTATION = gql`
  mutation CreateChannel($title: String!) {
    createChannel(data: { title: $title }) {
      id
    }
  }
`;

export default graphql(CHANNEL_MUTATION, {
  name: 'createChannel'
})(InputChannel);
