import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import API from '../api/api';

const Register = ({
	username, 
	password, 
	setUsername, 
	setPassword, 
	setRegisterToken, 
}) => {
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [confirmPassword, setconfirmPassword] = useState("");

	const confirmPasswords = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			history.push("/message");
		} else {
			registerRequest(e);
			history.push("/");
		}
	};

	const registerRequest = async (e) => {
		e.preventDefault();
		try {
			const user = {username, password, email};
			const data = await API.makeRequest('/users/register', 'POST', user);

			console.log('USER IS:', user);
			console.log('DATA IS:', data);

			const token = data.token;

			// const cartData = await API.makeRequest(`/cart/${data.id}`, 'POST', {total: 0})

			// console.log(cartData);
			console.log(token);

			if (token) {
				localStorage.setItem(`Token`, token);
				setEmail("");
				setUsername("");
				setPassword("");
				setconfirmPassword("");
				setRegisterToken(token);
				await API.makeRequest('/users/login', 'POST', user)
				history.push('/login');
				// console.log(cartData);
			} else {
				alert(data.message)
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<div className="loginMenu"></div>
			<form onSubmit={confirmPasswords}>
				<div className="signInMenuContent">
					<div className="signInInputs">
						<label>email</label>
							<input
								name="email"
								required
								onChange={(e) => setEmail(e.target.value)} 
								value={email}
							/>
					</div>
					<div className="signInInputs">
						<label>username</label>
							<input
								name="userName"
								required
								onChange={(e) => setUsername(e.target.value)} 
								value={username}
							/>
					</div>
					<div className="signInInputs">
							<label>password</label>
								<input 
								required
								name="password"
								onChange={(e) => setPassword(e.target.value)} 
								value={password} 
								required
								type="password"
							/>
						<div className="signInInputs">
							<label>confirm password</label>
								<input
									required
									type="password"
									value={confirmPassword}
									onChange={(e) => setconfirmPassword(e.target.value)}
								/>
						</div>
					</div>
				</div>
				<button className="signInButton" type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default Register;