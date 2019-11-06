import React from 'react'
import {Redirect} from "react-router-dom"
import LoginForm from './LoginForm'


class Login extends React.Component {

  render() {
    const isLoggedIn = this.props.data.isLogin
    console.log(this.props.data.isLogin)
    return (
      <div>
        {isLoggedIn ? <Redirect to="/home" /> : <LoginForm onSubmit={this.props.handleLogin} />}
      </div>
    )
  }
}

export default Login