import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from './pages/Home'
import Detail from './pages/Detail';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/detail/:id">
          <Detail></Detail>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
