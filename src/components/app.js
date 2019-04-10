import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for routes
import Board from '../routes/board';
import Settings from '../routes/settings';

export default class App extends Component {
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div id="app">
        <Header />
        <Router onChange={this.handleRoute}>
          <Board path="/board/" />
          <Settings path="/settings/" />
        </Router>
        <Board repo="RMSone/miu-insights" />
      </div>
    );
  }
}
