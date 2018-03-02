import React, { Component } from 'react';
import './channels.css';

class Channels extends Component {
  /**
   * Render the component
   */
  render() {
    return (
      <div className="channels">
        <h2>Channels</h2>
        <ul className="channels__list">
          <li className="channels__item">Channel name</li>
          <li className="channels__item">
            Another name long long time with some
          </li>
        </ul>
      </div>
    );
  }
}

export default Channels;
