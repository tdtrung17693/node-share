import React, { Component } from 'react'
import { withRouter } from 'react-router'

class HomeUploadSent extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        const { data } = this.props

        return (
            <div className="card card--sent">
                <div className="card-content">
                    <div className="card-content-inner">
                        <div className="home-sent">
                            <div className="sent-icon">
                                <i className="icon-fontawesome-webfont-11"/>
                                <h2>Dateien Gesendet</h2>
                            </div>
                            <p className="text-center">
                                Wir haben eine E-Mail mit einem Downloadlink an <span className="bold">{data.to}</span> gesendet. Das Link wird in 30 Tagen ablaufen.
                            </p>

                            <div className="form-actions">
                                <button
                                    onClick={() => {
                                        this.props.history.push(`/share/${data.id}`)
                                    }}
                                    className="button primary">Dateien Anzeigen</button>
                                <button
                                    onClick={this.props.onSendAnotherFile}
                                    className="button">Andere Dateien hochladen</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(HomeUploadSent)
