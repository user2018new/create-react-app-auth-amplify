import React, { Component } from 'react';
import publish from './publish.JPG';
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
          <img src={publish} alt="publish image" height={500} width={500} />
          </header>
      </div>
    );
  }
}

export default withAuthenticator(App, true);
