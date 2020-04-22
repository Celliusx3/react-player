import React, { Component } from 'react';
import './App.css';
import DetailsScreen from './screens/DetailsScreen';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SearchScreen from './screens/SearchScreen';
import HomeScreen from './screens/HomeScreen';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomeScreen/>
        </Route>
        <Route path="/search/:id">
          <SearchScreen/>
        </Route>
        <Route path="/details/:id">
          <DetailsScreen/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
