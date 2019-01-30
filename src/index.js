import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './app/masterApp/startup/App'
import App from './app/masterApp/containers/Blog/Blog';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
console.log('*************** Inside index.js 1111***********************');
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {
    console.log(request);
    // Edit request config
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log(response);
    // Edit request config
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

console.log('*************** Inside index.js ***********************');
ReactDOM.render( <App />, document.getElementById( 'root' ) );
// registerServiceWorker();

// Webpack Hot Module Replacement API
if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('./app/masterApp/startup/App', () => {
        const App = require('./app/masterApp/startup/App').default
        render(App)
    })
}
