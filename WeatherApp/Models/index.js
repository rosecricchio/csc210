import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import Index from './Pages/WeatherSearchPage';
import App from './PageComponents/SignUpPageComponents/App';
import Home from './Pages/SigninPage';

render((
  <Router>
    <App>
      <Switch>
        <div>
          {/* <Route exact path="/" component={Index}/> */}
          <Route exact path="/" component={Home}/>
        </div>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));