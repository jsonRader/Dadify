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
			const token = data.token;

			if (token) {
				localStorage.setItem(`Token`, token);
				setEmail("");
				setUsername("");
				setPassword("");
				setconfirmPassword("");
				setRegisterToken(token);
				await API.makeRequest('/users/login', 'POST', user)
				history.push('/login');
			} else {
				alert(data.message)
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<div className="registerMenu"></div>
			<form onSubmit={confirmPasswords}>
				<div className="signUpMenuContent">
					<div className="signInInputs">
							<input
								name="email"
								placeholder="email"
								required
								onChange={(e) => setEmail(e.target.value)} 
								value={email}
							/>
					</div>
					<div className="signInInputs">
							<input
								name="userName"
								placeholder="username"
								required
								onChange={(e) => setUsername(e.target.value)} 
								value={username}
							/>
					</div>
					<div className="signInInputs">
								<input 
								required
								name="password"
								placeholder="password"
								onChange={(e) => setPassword(e.target.value)} 
								value={password} 
								required
								type="password"
							/>
						<div className="signInInputs">
								<input
									required
									type="password"
									placeholder="confirm password"
									value={confirmPassword}
									onChange={(e) => setconfirmPassword(e.target.value)}
								/>
						</div>
					</div>
					<button className="signUpButton" type="submit">Sign Up</button>
				</div>
			</form>
		</div>
	);
}

export default Register;