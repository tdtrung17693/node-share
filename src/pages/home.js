import React, { Component } from 'react'
import Header from '../components/header'
import MainForm from '../components/main-form'
import HomeUploading from '../components/home-uploading'
import HomeUploadSent from '../components/home-upload-sent'

class Home extends Component {
    constructor (props) {
        super(props)

        this.state = {
            componentName: 'MainForm',
            data: null,
            uploadEvent: null
        }
    }

    _renderComponent = () => {
        const { componentName } = this.state

        if (componentName === 'HomeUploading') {
            return <HomeUploading data={this.state.data} event={this.state.uploadEvent} />
        } else if (componentName === 'HomeUploadSent') {
            return <HomeUploadSent
                onSendAnotherFile={ (ev) => {
                    ev.preventDefault()

                    this.setState({
                        componentName: 'MainForm'
                    })
                }}
                data={this.state.data} />
        } else {
            return (
                <MainForm
                    onUploadEvent={ev => {
                        let state = { uploadEvent: ev }

                        if (ev.type === 'success') {
                            state.componentName = 'HomeUploadSent'
                            state.data = ev.payload
                        }

                        this.setState(state)
                    }}

                    onUploadBegin={data => {
                        this.setState({
                            data: data,
                            componentName: 'HomeUploading'
                        })
                    }}
                />
            )
        }
    }

    render() {
        return (
            <div className={'app-container'}>
                <Header />
                <div className="app-content">
                    { this._renderComponent() }
                </div>
            </div>
        )
    }
}

export default Home