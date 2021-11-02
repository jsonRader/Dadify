import React, {useState, useEffect} from 'react';
import API from '../api/api';

const Admin = () => {
	const [users, setUsers] = useState([]);

    useEffect(async function() {
        try {
            const data = await API.makeRequest('/users', 'GET');
            setUsers(data);
			// console.log(data);
        } catch (error) {
            throw error;
        }
    }, []);

    return (
		<>
			<div>
				<div className="posts-header-image">
					<section className="page-header">
						<h1 className="header-text">Active Users:</h1>
					</section>
				</div>
				<section id="userList">
					{users.map((user, id) => {
						return (
							<>
							<div key={id} className="single-user">
								<h1>Username: {user.username}</h1>
								{/* <h2>First Name: {user.first_name}</h2>
								<h2>Last Name: {user.last_name}</h2> */}
								<h3>Email: {user.email}</h3>
								{/* <h3>Phone: {user.phone}</h3> */}
								<h5>Registered: {user.created_at}</h5>
							</div>
							</>
						)
					})}
				</section>
			</div>
		</>
    )
}

export default Admin