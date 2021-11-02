import React, {useState, useEffect} from 'react';
import {useHistory, Link} from "react-router-dom";
import axios from 'axios';
import API from '../api/api';
import Dad_Joke_Book from '../images/Dad_Joke_Book.svg';
import {Button} from '@material-ui/core';

const Home = ({username, password, setUsername, setPassword, setUserToken, loggedIn, setLoggedIn, setIsAdmin}) => {
	const [dadJoke, setDadJoke] = useState("");
	const [loadingJoke, setLoadingJoke] = useState(true);
	const [fetchingDadJoke, setFetchingDadJoke] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoadingJoke(true);
			const result = await axios("https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/type/general");
			setDadJoke(`${result.data[0].setup} ${result.data[0].punchline}`);
			setLoadingJoke(false);
		};
		setTimeout(() => {
			fetchData();
		}, 3500);
	}, [fetchingDadJoke])

	const history = useHistory()

	const logInRequest = async (event) => {
		event.preventDefault();
		try {
			const user = {username, password};
			const data = await API.makeRequest('/users/login', 'POST', user);
			setIsAdmin(data.isAdmin);

			if (data.error) {
				history.push("/message");
			} else {
				const token = data.token;
				const user_id = data.id;
				localStorage.setItem(`Token`, token);
				setUserToken(token);
				setLoggedIn(true);
				setUsername(username);
				localStorage.setItem(`UserId`, user_id);
				localStorage.setItem(`Username`, username);
				localStorage.setItem('Admin', data.isAdmin);
				localStorage.setItem('cartId', data.cart.id);
				history.push("/");
			}
		} catch (error) {
			console.error(error);
		} 
	};

	return (
		<>
			{loggedIn ?
				<>
					<div className="messageUnderHeader">
						<h3>Logged in as {localStorage.getItem("Username")}</h3>
					</div>
					{loadingJoke ? 
						<img className="jokeLoader" src={Dad_Joke_Book} alt="loader"/>
					: <div className="dadJoke">
						<h1>{dadJoke}</h1>
						<Button 
							id="dad-joke-button"
							onClick={() => setFetchingDadJoke(!fetchingDadJoke) }>Get Another Knee Slapper!</Button>
					</div>
					}
				</>
			: <>
				<div className="loginMenu"></div>
				<div className="loginMenuContent">
					<form onSubmit={logInRequest}>
						<div className="loginInputs">
							<h2>username </h2>
							<input 
								className="inputareas"
								onChange={(event) => setUsername(event.target.value)}
								value={username}
								label="Username"
								name="username"
								type="text"
							/>
						</div>
						<div className="loginInputs">
							<h2>password </h2>
							<input 
								className="inputareas"
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
			</>}
		</>
	)
}

export default Home;