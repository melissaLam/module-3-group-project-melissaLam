import React, { PropTypes } from 'react';

import Router from 'react-router/BrowserRouter';
import Match from 'react-router/Match';
import Link from 'react-router/Link';
import { connect } from 'react-redux';

import './App.css';
import Home from './components/Home';
import Movie from './components/Movie';
import Movies from './components/Movies';
import Login from './components/Login';

import MatchWhenAuthorized from './components/MatchWhenAuthorized';

const App = ({
  firstName,
  lastName,
  isAuthenticated,
}) => (
  <Router>
    <div className="App">
      <div className="App-header">
        <h2>Mel Movies</h2>

        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>

        {isAuthenticated && (
          <p>Hello, { firstName } { lastName }!</p>
        )}
      </div>

      <div className="container">
        <Match exactly pattern="/" component={Home} />
        <Match pattern="/login" component={Login} />

        <MatchWhenAuthorized exactly pattern="/movies" component={Movies} />
        <MatchWhenAuthorized pattern="/movies/:movieId" component={Movie} />
      </div>
    </div>
  </Router>
  );

App.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
};

export function mapStateToProps({
  auth: {
    isAuthenticated,
    user: {
      firstName,
      lastName,
    },
  },
}) {
  return {
    firstName,
    lastName,
    isAuthenticated,
  };
}

export default connect(mapStateToProps)(App);
