import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Provider as KeepAliveProvider, KeepAlive } from 'react-keep-alive';
import store from "./store/index";

import Home from './pages/Home'
import Detail from './pages/Detail';
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <KeepAliveProvider>
          <Switch>
            <Route exact path="/">
              <KeepAlive name="home">
                <Home></Home>
              </KeepAlive>
            </Route>
            <Route path="/detail/:id">
              <Detail></Detail>
            </Route>
          </Switch>
        </KeepAliveProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
