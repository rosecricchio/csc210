import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import Home from './Pages/Home/Home';
import HelloWorld from './components/HelloWorld/HelloWorld';



render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/helloworld" component={HelloWorld}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
