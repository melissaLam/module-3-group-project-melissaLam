import React, { PropTypes } from 'react';
import Match from 'react-router/Match';
import Redirect from 'react-router/Redirect';

import { connect } from 'react-redux';

const MatchWhenAuthorized = ({
  component: Component,
  isAuthenticated,
  ...rest,
}) => (
  <Match
    {...rest}
    render={props => (
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    )}
  />
);

MatchWhenAuthorized.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.element.isRequired,
  location: PropTypes.string,
};

export const mapStateToProps = ({
  auth: {
    isAuthenticated,
  },
}) => ({
  isAuthenticated,
});

export default connect(
  mapStateToProps,
)(MatchWhenAuthorized);
