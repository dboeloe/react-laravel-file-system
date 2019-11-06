import React from 'react'
import {Link} from "react-router-dom";


class Login extends React.Component {

  render() {
    return (
      <div>
        <form id="login-form">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <Link to="/register">
          Register
        </Link>
      </div>

    )
  }
}

export default Login