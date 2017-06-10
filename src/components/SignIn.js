import React from 'react';
import { connect } from 'react-redux';

import Auth from '../lib/Auth';
import { loginUser } from '../actions/SessionActions';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: {
        email: '',
        password: ''
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
  }

  onChange(event) {
    let field = event.target.name;
    let credentials = this.state.credentials;
    credentials[field] = event.target.value;
    this.setState({credentials});
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.loginUser(this.state.credentials);
  }

  componentWillReceiveProps(nextProps) {
    if (Auth.isUserAuthenticated()) {
      this.props.router.push({pathname: '/replays'});
    }
  }

  render() {
    return (
      <div className="container">
        <h2>Sign In</h2>
        { this.renderLoading() }
        { this.renderError() }
        <div>
          <form onSubmit={this.onSubmit}>
            <label>Email</label>
            <input type="text"
              name="email"
              onChange={this.onChange}
              value={this.state.credentials.email} />
            <label>Password</label>
            <input type="password"
              name="password"
              onChange={this.onChange}
              value={this.state.credentials.password} />
            <br />
            <button className="btn" type='submit'>Sign In</button>
          </form>
        </div>
      </div>
    );
  }

  renderLoading() {
    if (this.props.isLoading) {
      return (
        <span>LOGGING IN</span>
      )
    }

    return null;
  }

  renderError() {
    if (this.props.error) {
      return (
        <div className="errors">
          <i className="fa fa-exclamation-triangle" aria-hidden="true"/>
          <span>{this.props.error}</span>
        </div>
      )
    }

    return null
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.session.isLoading,
    error: state.session.error,
    session: state.session
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser: (credentials) => dispatch(loginUser(credentials))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
