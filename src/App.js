import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Register from './components/register/register';
import Chat from './components/chat/chat';
import './App.css';

const httpLink = new HttpLink({ uri: 'http://localhost:3000' });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      nickname: 't'
    };
  }

  setNickname(nickname) {
    this.setState({ nickname: nickname });
  }

  renderApp() {
    if (this.state.nickname !== '') {
      return <Chat />;
    } else {
      return <Register setNickname={nickname => this.setNickname(nickname)} />;
    }
  }

  render() {
    return <ApolloProvider client={client}>{this.renderApp()}</ApolloProvider>;
  }
}

export default App;
