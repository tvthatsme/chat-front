import React from 'react';
import './statement.css';

const Statement = ({ name, text }) => (
  <div className="statement">
    <strong>{name}</strong>
    <p>{text}</p>
  </div>
);

export default Statement;
