import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from '../pages/Home';
import Pokemon from '../pages/Pokemon';

// import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/">
      <Redirect to="/pokedex" />
    </Route>
    <Route path="/pokedex" exact component={Home} />
    <Route path="/pokedex/:id" exact component={Pokemon} />
  </Switch>
);

export default Routes;
