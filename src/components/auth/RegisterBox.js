import React from 'react';
import './auth.css';
import { sendRequest } from '../../sendRequest/sendRequest';
import { registerApi } from '../../sendRequest/apis';
import { Redirect } from 'react-router-dom';

class RegisterBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      loggedIn: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
  }


  submitRegister(e) {

    sendRequest(registerApi, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: btoa(this.state.password),
        name: this.state.name,
      }),
    }).then((body) => {
      if (body.jwt && body.name) {
        localStorage.setItem('jwt-eimmigrate', body.jwt);
        this.setState({ loggedIn: true, name: body.name })
      }
    });
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
          Register
          </div>
        <div className="box">

          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className="login-input"
              onChange={this.handleInputChange}
              placeholder="Name" />
          </div>

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
            onClick={this
              .submitRegister
              .bind(this)}>Register</button>
        </div>
      </div>
    );
  }
}

export default RegisterBox;