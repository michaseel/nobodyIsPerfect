import React from 'react';
import ReactDOM from 'react-dom';
import Answers from './components/Answers';
import Players from './components/Players';
import Results from './components/Results';
import Rounds from './components/Rounds';
import App from './App';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

injectTapEventPlugin();

const Routes = () => (
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="players" component={Players} />
        <Route path="rounds" component={Rounds} />
        <Route path="answers" component={Answers} />
        <Route path="results" component={Results} />
        <IndexRoute component={Results} />
      </Route>
    </Router>
  </MuiThemeProvider>
);

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);
