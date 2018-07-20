import React, { Component, Fragment } from 'react'
import classname from 'classname'

import { upload } from '../helpers/upload'
import { humanReadableSize } from '../helpers/convertSize'

class HomeUploading extends Component {
    constructor(props) {
        super(props)

        this.state = {
            lastTime: new Date(),
            lastLoaded: 0,
            speedUpload: 0,
            data: {},
            event: {},
            loaded: 0,
            total: 0,
            percentage: 10
        }
    }

    componentDidMount() {
        const { data } = this.props

        this.setState({
            data
        })
    }

    static getDerivedStateFromProps(props, state) {
        if (!props.event) {
            return state
        }

        let nextState = { ...state }

        nextState = {
            ...nextState,
            event: props.event
        }

        if (props.event.type === 'onUploadProgress') {
            nextState.loaded = props.event.payload.loaded
            nextState.total = props.event.payload.total
            nextState.percentage = nextState.total !== 0 ? Math.floor((nextState.loaded / nextState.total) * 100) : 0

            let currentTime = new Date()
            let diffTime = currentTime - nextState.lastTime

            diffTime = diffTime === 0 ? 1 : diffTime

            nextState.speedUpload = (nextState.loaded - nextState.lastLoaded) / diffTime
            nextState.lastTime = currentTime
            nextState.lastLoaded = nextState.loaded
        }

        return nextState
    }

    _getUploadState() {
        const total = humanReadableSize( this.state.total, 'B' )
        const loaded = humanReadableSize( this.state.loaded, 'B' )

        return `${loaded} / ${total}`
    }

    render() {
        const { percentage, data, event } = this.state
        const totalFiles = (data.files || []).length
        console.log(event)
        return (
            <div className="card card--uploading">
                <div className="card-content">
                    <div className="card-content-inner">
                        <div className="home-uploading">
                            <div className="uploading-icon">
                                <i className="icon-upload"/>

                                <h2>Hochladen...</h2>
                            </div>

                            <div className="upload-files-total">
                                Hochladen { totalFiles } { totalFiles > 1 ? 'Dateien' : 'Datei' }...
                            </div>

                            <div className="upload-progress">
                                <div style={{ width: `${percentage}%` }} className="upload-progress-completed"></div>
                            </div>

                            <div className="upload-stats">
                                <div className="stats-left">{ this._getUploadState() }</div>
                                <div className="stats-right">{ humanReadableSize(this.state.speedUpload) }/s </div>
                            </div>

                            <div className="form-actions">
                                <button className="button">Schließen</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeUploading
