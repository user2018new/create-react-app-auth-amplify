import React, { Component } from 'react';
import publish from './publish.jpg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={publish} className="App-image" alt="publish image" />
          <p>
            Welcome to Signout page, click the button for signout confirmation
          </p>
          </header>
      </div>
    );
  }
}

export default withAuthenticator(App, true);
