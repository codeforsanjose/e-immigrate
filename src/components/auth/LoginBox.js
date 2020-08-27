import React from 'react';
import './auth.css';
import { sendRequest } from '../../sendRequest/sendRequest';
import { Redirect } from 'react-router-dom';
import { loginApi } from '../../sendRequest/apis';

class LoginBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loggedIn: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  submitLogin() {
    sendRequest(loginApi, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: btoa(this.state.password)
      })
    }).then((body) => {
      if (body.jwt && body.name) {
        localStorage.setItem('jwt-eimmigrate', body.jwt);
        this.setState({ loggedIn: true, name: body.name })
      }
    })
  }
  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to={{
        pathname: '/users',
        state: { name: this.state.name }
      }} />
    }
    return (
      <div className="inner-container">
        <div className="header">
          Login
            </div>
        <div className="box">

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="login-input"
              onChange={this.handleInputChange}
              placeholder="Email" />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              onChange={this.handleInputChange}
              placeholder="Password" />
          </div>

          <button
            type="button"
            className="login-btn"
            onClick={this.submitLogin.bind(this)}>Login</button>
        </div>
      </div>
    );
  }
}

export default LoginBox;