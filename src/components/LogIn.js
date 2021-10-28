import React from 'react';
import {useHistory, Link} from "react-router-dom";
import API from '../api/api';

const LogIn = ({username, password, setUsername, setPassword, setUserToken, loggedIn, setLoggedIn}) => {
	const history = useHistory()

	const logInRequest = async (event) => {
		event.preventDefault();
		try {
			const user = {username, password};
			const data = await API.makeRequest('/users/login', 'POST', user);
			if (data.error) {
				history.push("/message");
			} else {
				const token = data.token;
				localStorage.setItem(`Token`, token);
				setUserToken(token);
				setLoggedIn(true);
				setUsername(username);
				localStorage.setItem(`Username`, username);
				history.push("/");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			{loggedIn ?
				<div className="messageUnderHeader">
					<h3>Logged in as {localStorage.getItem(`Username`)}</h3>
				</div>
				:
				<>
					<div className="loginMenu">
					</div>
					<div className="loginMenuContent">
						<form onSubmit={logInRequest}>
							<div className="loginInputs">
								<h2>username </h2>
								<input className="inputareas"
									onChange={(event) => setUsername(event.target.value)}
									value={username}
									label="Username"
									name="username"
									type="text"
								/>
							</div>
							<div className="loginInputs">
								<h2>password </h2>
								<input className="inputareas"
									onChange={(event) => setPassword(event.target.value)}
									value={password}
									label="Password"
									name="password"
									type="password"
								/>
							</div>
						</form>
					</div>
					<div className="buttonContainer">
						<button className="loginButton" onClick={logInRequest}>Log In</button>
					</div>
					<div className="signUpSection">
						<p> Don't have an account? </p>
						<Link to="/register" className="signUpLink">Sign Up</Link>
					</div>
				</>
			}
		</>
	)
}

export default LogIn;