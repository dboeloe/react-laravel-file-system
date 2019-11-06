import React from 'react'
import RegisterForm from './RegisterForm'
import { Redirect } from "react-router-dom";



class Register extends React.Component {
  
  render() {
    const isLoggedIn = this.props.data.isLogin
    console.log(this.props.data.isLogin)
    return (
      <div>
        {isLoggedIn ? <Redirect to="/home" /> : <RegisterForm onSubmit={this.props.handleRegister}/>}
      </div>
    )
  }
}

export default Register