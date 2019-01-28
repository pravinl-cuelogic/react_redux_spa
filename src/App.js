import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import createStore from './store/masterStore';

import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
  	console.log('*******************');
  	console.log('this.props', this.props);
  	const store = createStore(this.props);
    return (
    	<Provider store={ store }>
    		<BrowserRouter>
		        <div className="App">
		            <Blog />
		        </div>
	        </BrowserRouter>
    	</Provider>
    );
  }
}

export default App;
