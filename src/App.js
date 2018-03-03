import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, split } from 'apollo-client-preset';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import Register from './components/register/register';
import Chat from './components/chat/chat';
import './App.css';

const baseUrl = 'localhost:4466/chat-back/dev';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJjaGF0LWJhY2tAZGV2Iiwicm9sZXMiOlsiYWRtaW4iXX0sImlhdCI6MTUyMDA1OTcwNywiZXhwIjoxNTIwNjY0NTA3fQ.k41IJ6Q7RdEVboaqemTZOto37-F-WOU6pg6o0UqGP08';
const httpLink = new HttpLink({ uri: `http://${baseUrl}` });

const wsLink = new WebSocketLink({
  uri: `ws://${baseUrl}`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: token
    }
  }
});

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  // const token = token;
  const authorizationHeader = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  });
  return forward(operation);
});

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLinkWithAuthToken
);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});

class App extends Component {
  constructor() {
    super();

    const storedNickname = localStorage.getItem('user-id');

    this.state = {
      userId: storedNickname !== null ? storedNickname : ''
    };
  }

  setUserId(id) {
    this.setState({ userId: id });
    localStorage.setItem('user-id', id);
  }

  renderApp() {
    if (this.state.userId !== '') {
      return <Chat userId={this.state.userId} />;
    } else {
      return <Register setNickname={id => this.setUserId(id)} />;
    }
  }

  render() {
    return <ApolloProvider client={client}>{this.renderApp()}</ApolloProvider>;
  }
}

export default App;
