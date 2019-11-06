import React from 'react'

import {Link} from "react-router-dom";


class RegisterForm extends React.Component {

  constructor(props) {
    super(props);
    
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  

  handleSubmit(event) {
    event.preventDefault()

    this.props.onSubmit(event.target)
  }

  render() {
    return (
      <div>
        <form id="register-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="emailAddress">Email address</label>
            <input type="email" className="form-control" id="emailAddress" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="username">Name</label>
            <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter username" />
            <small id="usernameHelp" className="form-text text-muted">Your username.</small>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
          </div>
          <button id="register-button" type="submit" className="btn btn-primary">Register</button>
        </form>
        <Link to="/">
          Login
        </Link>
      </div>
    )
  }
}


export default RegisterForm