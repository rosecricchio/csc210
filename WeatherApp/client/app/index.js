import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import Index from './ReactWeatherSearchScripts/pages/pageIndex';
import App from './components/App/App';
import Home from './components/Home/Home';

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