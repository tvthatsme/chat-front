import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Register from './components/register/register';
import Chat from './components/chat/chat';
import './App.css';

const httpLink = new HttpLink({ uri: 'http://localhost:4466/chat-back/dev' });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJjaGF0LWJhY2tAZGV2Iiwicm9sZXMiOlsiYWRtaW4iXX0sImlhdCI6MTUyMDA1OTcwNywiZXhwIjoxNTIwNjY0NTA3fQ.k41IJ6Q7RdEVboaqemTZOto37-F-WOU6pg6o0UqGP08';
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
