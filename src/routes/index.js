import React from 'react'
import { Redirect } from "react-router-dom";

import Home from "../pages/Home"
import Detail from '../pages/Detail'

export default [{
  component: Home,
  routes: [{
    path: '/',
    exact: true,
    render: () => <Redirect to={"/index"} />
  }, {
    path: '/index',
    component: Home
  }, {
    path: '/detail',
    component: Detail
  }]
}]