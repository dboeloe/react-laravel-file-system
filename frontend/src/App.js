import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import axios from 'axios'
import $ from "jquery";

import Login from './Components/Login'
import Register from './Components/Register'
import Home from './Components/Home'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      isLogin: false,
      user: {}
    }

    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  componentDidMount() {
    let appState

    try {
      appState = JSON.parse(localStorage["appState"])
    }
    catch (err) {
      appState = false
    }


    if (appState) {
      this.setState(appState)
    } else if (window.location.pathname !== '/') {
      window.location.replace('/')
    }
  }

  handleRegister(data) {

    $("#register-button")
      .attr("disabled", "disabled")
      .html(
        '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
      );
    const email = data.emailAddress.value
    const username = data.username.value
    const password = data.inputPassword.value

    var formData = new FormData();
    formData.append("password", password);
    formData.append("email", email);
    formData.append("name", username);

    axios
      .post("http://localhost:8000/api/user/register", formData)
      .then(response => {
        if (response.data.success) {
          const { name, id, email, auth_token, organization_id } = response.data.data;
          
          let userData = {
            name,
            id,
            email,
            auth_token,
            organization_id,
            timestamp: new Date().toString()
          }
          const newState = {
            isLogin: true,
            user: userData
          }

          this.setState(newState)

          localStorage["appState"] = JSON.stringify(newState)
          
          $("#register-button")
            .removeAttr("disabled")
            .html("Register")

          window.location.replace("/home");

        }
      })
      .catch(error => {
        alert(`An Error Occured! ${error}`);
        $("#register-button")
          .removeAttr("disabled")
          .html("Register");
      })
  }

  handleLogin(data) {
    $("#login-button")
      .attr("disabled", "disabled")
      .html(
        '<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i><span class="sr-only">Loading...</span>'
      );

    const email = data.emailAddress.value
    const password = data.inputPassword.value

    var formData = new FormData();
    formData.append("password", password);
    formData.append("email", email);

    axios
      .post("http://localhost:8000/api/user/login/", formData)
      .then(response => {
        if (response.data.success) {
          const { name, id, email, auth_token, organization_id } = response.data.data;

          let userData = {
            name,
            id,
            email,
            auth_token,
            organization_id,
            timestamp: new Date().toString()
          }
          const newState = {
            isLogin: true,
            user: userData
          }

          this.setState(newState)

          localStorage["appState"] = JSON.stringify(newState)

          $("#login-button")
            .removeAttr("disabled")
            .html("Login")

          window.location.replace("/home");

        }
      })
      .catch(error => {
        alert(`An Error Occured! ${error}`);
        $("#login-button")
          .removeAttr("disabled")
          .html("Login");
      })
  }


  render() {
    console.log("render app")
    return (
      <div className='container'>
        <Router>
          <Switch>
            <Route exact path="/">
              <Login data={this.state}/>
            </Route>
            <Route path="/register">
              <Register data={this.state} handleRegister={this.handleRegister}/>
            </Route>
            <Route path="/home">
              <Home data={this.state} />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
