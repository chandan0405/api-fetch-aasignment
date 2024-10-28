import { render } from 'preact'
import './index.css'
import { App } from './app.jsx'
import { Provider } from 'react-redux'
import { store } from './reduxToolkit/store.js'
import { BrowserRouter as Router } from 'react-router-dom';

render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
    , document.getElementById('app'))
