import React from 'react';
import {Link} from 'react-router-dom';

const Message = () => {
	return (
		<div id="message">
			<h1>The Passwords you entered did not match. Please try registering again.</h1>
			<Link to="/">Back to Home</Link>
		</div>
	)
}

export default Message