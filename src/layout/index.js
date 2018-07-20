import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TopBar from '../components/topbar'
import Home from '../pages/home'
import View from '../pages/view'

class Layout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showLoginForm: false
        }
    }

    render() {
        return (
            <div className={'app-layout'}>
                <Router>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/share/:id' component={View}/>
                        <Route path='*' component={() => <div class="page-404"><h1>404</h1><h2>Page Not Found</h2></div>}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Layout