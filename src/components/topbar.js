import React, { Component } from 'react'

class TopBar extends Component {
    render() {

        return (
            <div className="app-top-bar">
                <div className="app-top-bar-inner">
                    <div className="app-top-bar-left">
                        <div className="site-name">
                            <i className="icon-android-send"></i>
                            <span>TEILEN</span>
                        </div>
                    </div>
                    <div className="app-top-bar-right">
                        <div className="user-profile">
                            <div className="user-profile-menu">
                                <a
                                onClick={this.props.showForm}
                                className="sign-in">Anmelden</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TopBar
