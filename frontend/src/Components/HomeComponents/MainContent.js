import React from 'react'
import axios from 'axios'

class MainContent extends React.Component {

  constructor(props) {
    super(props)

    this.handleDownload = this.handleDownload.bind(this)
  }

  handleDownload(event) {
    event.preventDefault()

    let filename = event.target.name
    axios({
      url: `http://localhost:8000/api/organization/${this.props.data.user.id}/file/${event.target.id}?token=${this.props.data.user.auth_token}`,
      method: 'GET',
      responseType: 'blob',
    })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url;
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click();
      })
  }

  render() {
    let data
    try {
      data = JSON.parse(localStorage["fileData"])         
    } catch (error) {
      data = []
    }


    return (
      <table className="table">
        <thead></thead>
        <tbody>
          {data.map(datum => {
            return <tr key={datum.id}>
              <td>{datum.name}</td>
              <td>{datum.file_type}</td>
              <td>
                <button id={datum.id} name={datum.name} onClick={this.handleDownload} className="btn btn-primary"> Download</button>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    )
  }
}
export default MainContent