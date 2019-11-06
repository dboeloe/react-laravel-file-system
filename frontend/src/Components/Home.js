import React from 'react'
import Navbar from './HomeComponents/Navbar'
import MainContent from './HomeComponents/MainContent'
import FileMenu from './HomeComponents/FileMenu'
import axios from 'axios'
import isEmpty from 'lodash/isEmpty'

class Home extends React.Component {

  constructor(props) {
    super(props)
    
    console.log('constructor')
    let appState
    try {
      appState = JSON.parse(localStorage["appState"])      
      this.state = {
        selected_file_id: [],
        user: appState.user,
        parent_id: null
      }
    } catch (error) {
      this.state = {
        selected_file_id: [],
        user: {},
        parent_id: null
      }
    }

    this.updateState = this.updateState.bind(this)
  }
  componentDidMount() {
    if (!isEmpty(this.state.user)) {
      axios
        .get(`http://localhost:8000/api/organization/${this.state.user.organization_id}/home?token=${this.state.user.auth_token}&fpid=${this.state.parent_id}`)
        .then(response => {
          localStorage["fileData"] = JSON.stringify(response.data)
          this.updateState()
        })
        .catch(error => {
          if (error.response.status === 401) {
            localStorage.clear();
            window.location.replace("/")
          }
        })
    }
  }

  updateState() {
    console.log("updateState")
    axios
      .get(`http://localhost:8000/api/organization/${this.state.user.organization_id}/home?token=${this.state.user.auth_token}&fpid=${this.state.parent_id}`)
      .then(response => {
        localStorage["fileData"] = JSON.stringify(response.data)
        let newState = this.state
        newState.update = true
        this.setState(newState)
      })
      .catch(error => {
        if (error.response.status === 401) {
          localStorage.clear();
          window.location.replace("/")
        }
      })
  }
  
  componentDidUpdate() {
    if (!isEmpty(this.state.user)) {
      axios
        .get(`http://localhost:8000/api/organization/${this.state.user.organization_id}/home?token=${this.state.user.auth_token}&fpid=${this.state.parent_id}`)
        .then(response => {
          localStorage["fileData"] = JSON.stringify(response.data)
        })
        .catch(error => {
          if (error.response.status === 401) {
            localStorage.clear();
            window.location.replace("/")
          }
        })
    }
  }
  render() {
    return (
      <div>
        <Navbar />
        <FileMenu data={this.state.user} pid={this.state.parent_id} updateState={this.updateState}/>
        <MainContent data={this.state}/>
      </div>

    )
  }
  
}

export default Home