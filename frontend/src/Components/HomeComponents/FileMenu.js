import React from 'react'
import axios from 'axios'

class FileMenu extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      file_content: '',
      file_name: "",
      file_type: ""
    }
    this.handleUpload = this.handleUpload.bind(this)
    this.onChange = this.onChange.bind(this)
    this.createFile = this.createFile.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  handleUpload(event) {
    event.preventDefault()
    this.fileUpload(this.state.file)

  }

  onChange(e) {
    let files = e.target.files || e.dataTransfer.files;
    window.dboeloe = files
    if (!files.length)
      return;
    this.createFile(files[0]);
  }
  createFile(file) {
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        file_content: e.target.result,
        file_name: file.name,
        file_type: file.type

      })
    };
    reader.readAsDataURL(file);
  }

  fileUpload(file) {
    let config = {
      headers: {
        'Authorization': `Bearer ${this.props.data.auth_token}`
        }
    }
    const url = `http://localhost:8000/api/organization/${this.props.data.organization_id}/file`;
    const formData = { file: this.state.file_content, parent_id: this.props.pid, filename: this.state.file_name, filetype: this.state.file_type  }
    axios
      .post(url, formData, config)
      .then(response => {
        this.setState({
          file_content: '',
          file_name: "",
          file_type: ""
        })

        this.props.updateState()
      })
  }

  render() {
    return(
      <form onSubmit={this.handleUpload} encType="multipart/form-data" >
        <h1>Upload File</h1>
        <label className="label_imagem_artigo"> Upload File </label>
        <input className="input_imagem_artigo" type="file" onChange={this.onChange} name="file"/>
        <button id="upload-button">
          Upload File
        </button>

      </form>
    )
  }

}
export default FileMenu