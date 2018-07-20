import React, { Component } from 'react'
import { withRouter } from 'react-router'
class Header extends Component {
    render() {
        return (
            <div className="app-header">
                <div className="app-site-info">
                    <h1 onClick={() => { this.props.history.push('') } }><i className="icon-android-send"></i> TEILEN</h1>
                    <div className="site-title">
                        Teilen Sie Ihre Dateien
                    </div>
                    <div className="site-slogan">
                        Sicher und kostenlos
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)
