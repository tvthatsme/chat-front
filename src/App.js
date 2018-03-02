import React, { Component } from 'react';
import Register from './components/register/register';
import Chat from './components/chat/chat';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      nickname: ''
    };
  }

  setNickname(nickname) {
    this.setState({ nickname: nickname });
  }

  render() {
    if (this.state.nickname !== '') {
      return <Chat />;
    } else {
      return <Register setNickname={nickname => this.setNickname(nickname)} />;
    }
  }
}

export default App;
