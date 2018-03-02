import React, { Component } from 'react';
import Register from './components/register/register';
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
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      );
    } else {
      return <Register setNickname={nickname => this.setNickname(nickname)} />;
    }
  }
}

export default App;
