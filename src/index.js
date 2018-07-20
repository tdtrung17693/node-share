import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import "./scss/app.scss"

import Layout from './layout'

ReactDOM.render(<Layout />, document.getElementById('root'))
registerServiceWorker()