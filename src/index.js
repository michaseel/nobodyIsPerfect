import React from 'react';
import ReactDOM from 'react-dom';
import Players from './components/Players';
import Rounds from './components/Rounds';
import App from './App';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

const Routes = () => (
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="players" component={Players} />
        <Route path="rounds" component={Rounds} />
        <Route path="answers" component={Players} />
        <Route path="results" component={Players} />
        <IndexRoute component={Players} />
      </Route>
    </Router>
  </MuiThemeProvider>
);

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);
