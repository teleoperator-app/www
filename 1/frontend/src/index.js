import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import Dashboard from './components/Dashboard';
import IncidentReport from './components/IncidentReport';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/incident-report" component={IncidentReport} />
    </Switch>
  </Router>,
  document.getElementById('root')
);