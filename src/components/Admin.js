import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import API from '../api/api';

const Admin = (username) => {
	const [user, setUser] = useState([]);

	const userSearchRequest = async (event) => {
		event.preventDefault();
		try {
			const data = await API.makeRequest(`/users/${username}`);
			setUser(data)
			return user;
		} catch (error) {
			throw error;
		}
	}

	return (
		<div id="admin">
			<h1>For The Admin Things</h1>
			<Link to="/">Back to Home</Link>
			<div>Create a new product</div>
			<div>Delete a product</div>
			<div>Edit a product</div>
			<div><Link to="/adminusers">View User information</Link></div>
		</div>
	)
}

export default Admin