import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.css';

import {
	BrowserRouter as Router,
} from 'react-router-dom';

const App = () => {

	return (
		<>
			<div className="app">
				<h1>Dad-ify!</h1>
			</div>
		</>
	)
}

ReactDOM.render(<Router><App /></Router>, document.getElementById('app'))