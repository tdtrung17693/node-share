import React, { Component } from 'react'
import Header from '../components/header'
import { getDownloadInfo } from '../helpers/download'
import { humanReadableSize } from '../helpers/convertSize'
import { API_URL } from '../config'

class View extends Component {

    constructor(props) {
        super(props)
        this.state = {
            post: null,
            loading: true
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params

        getDownloadInfo(id)
            .then(response => {
                this.setState({
                    post: response.data
                })
            })
            .catch(err => {
                console.error(err);
            })
    }

    getTotalFileSize() {
        if (!this.state.post) return 0
        const size = this.state.post.files.reduce((s, f) => s + f.size, 0)

        return humanReadableSize(size)
    }

    getTotalFileNumber() {
        if (!this.state.post) return 0

        const l = this.state.post.files.length
        const unit = ( l > 1 ) ? 'Dateien' : 'Datei'

        return `${l} ${unit}`
    }

    getFileList() {
        if (!this.state.post) return ""

        return this.state.post.files.map((file, index) => {
            return (<div className="file" key={Date.now() + index}>
                <a href={file.path} className="filename">{file.originalname}</a>
            </div>)
        })
    }

    render() {
        const id = this.state.post ? this.state.post.id : 0

        console.log(this.getTotalFileSize())
        return (
            <div className={'app-container download'}>
                <div className="app-content">
                    <Header />

                    <div className="card">
                        <div className="card-content">
                            <div className="card-content-inner">
                                <div className="view-share">
                                    <div className="share-icon">
                                        <i className="icon-download"/>
                                        <h2>Bereit zum Herunterladen</h2>
                                    </div>

                                    <div className="share-info">
                                        <span className="total-file">{this.getTotalFileNumber()}</span>
                                        <span className="total-size"> {this.getTotalFileSize()}</span>
                                    </div>

                                    <div className="file-list">
                                        { this.getFileList() }
                                    </div>

                                    <div className="form-actions">
                                        <a href={`${API_URL}/posts/${id}?download=1`} className="button primary">Alle herunterladen</a>

                                        <button
                                            onClick={this.props.onSendAnotherFile}
                                            className="button">Teilen</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default View
