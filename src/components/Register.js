import React, {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
// import { log in function -> handleRegister } from '../api/index';

const Register = ({
	username, 
	password, 
	setUsername, 
	setPassword, 
	setRegisterToken, 
	registerToken, 
	setLoggedIn }) => {

	const history = useHistory();

	const [confirmPassword, setconfirmPassword] = useState("");

	const confirmPasswords = (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			history.push("/message");
		} else {
			registerRequest(event);
		}
	};

	const registerRequest = async (event) => {
		event.preventDefault();
		try {
			const data = await handleRegister(username, password);
			if (data.success === false) {
				setUsername("");
				setPassword("");
				setconfirmPassword("");
			} else {
				const token = data.token;
				localStorage.setItem(`Token`, token);
				setRegisterToken(token);
				setUsername(username);
				setLoggedIn(false);
				localStorage.setItem(`Username`, username);
				console.log(data);
			}
		} catch (error) {
			console.error(error);
		}
	};

	if (registerToken) {
		history.push("/")
	}

	return (
		<div>
			<div className="loginMenu">
					</div>
			<form onSubmit={confirmPasswords}>
				<div className="signInMenuContent">
				<div className="signInInputs">
				<label>username</label>
					<input
						name="userName"
						required
						onChange={(event) => setUsername(event.target.value)} value={username}
					/>
				</div>
				<div className="signInInputs">
				<label>password</label>
					<input 
						required
						name="password"
						onChange={(event) => setPassword(event.target.value)} value={password} required
						type="password"
					/>
				<div className="signInInputs">
				<label>confirm password</label>
					<input
						required
						type="password"
						value={confirmPassword}
						onChange={(event) => setconfirmPassword(event.target.value)}
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