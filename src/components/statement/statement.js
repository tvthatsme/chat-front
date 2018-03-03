import React from 'react';
import './statement.css';

/**
 * Render a statement
 *
 * @param {String} name nickname of the user posting
 * @param {String} text statement the user has posted to the chat room
 */
const Statement = ({ name, text }) => (
  <div className="statement">
    <strong>{name}</strong>
    <p>{text}</p>
  </div>
);

export default Statement;
