import React from 'react'
import { Link } from "react-router-dom"
import isEmpty from 'lodash/isEmpty'


class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleSubmit(event) {
    console.log("adada")
    event.preventDefault()

    if (isEmpty(event.target.emailAddress.value) || isEmpty(event.target.inputPassword.value)){
      alert("Please Fill All Forms")
    } else {
      this.props.onSubmit(event.target)
    }

  }

  render() {
    return (
      <div>
        <form id="login-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="emailAddress" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          <Link type="button" className="btn btn-primary" to="/register">
            Register
        </Link>
        </form>
      </div>
    )
  }
}


export default LoginForm