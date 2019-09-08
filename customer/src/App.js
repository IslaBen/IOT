import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/navbar/Navbar'
import Landing from './components/landing/Landing'
import Login from './components/login/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Search from './components/Search'
import Details from './components/details/details';
import styled from "@emotion/styled";
import {useTheme} from "./components/ThemeContext";




class App extends Component {
  render() {

    return (
      <Router >

        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container-fluid mx-0">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/customer/:id" component={Details} />
          </div>
        </div>
      </Router>

    )
  }
}

export default App
