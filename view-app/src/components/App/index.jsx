import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';


const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" render={() => <h1> it works </h1>} />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    </div>
  </Router>
);

export default App;
