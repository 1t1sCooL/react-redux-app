import './index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import {Provider} from "react-redux";
import {store} from "./reducers";



const root = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    root
)

