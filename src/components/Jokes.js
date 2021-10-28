import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Dad_Joke_Book from '../images/Dad_Joke_Book.svg';

const Message = () => {
	const [dadJoke, setDadJoke] = useState("");
	const [loadingJoke, setLoadingJoke] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoadingJoke(true);
			const result = await axios("https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/type/general");
			console.log(result.data);
			setDadJoke(`${result.data[0].setup} ${result.data[0].punchline}`);
			setLoadingJoke(false);
		};
		setTimeout(() => {
			fetchData();
		}, 3500);
	}, [])

	return (
		<div id="message">
			<div>
				{loadingJoke ? 
					<img className="jokeLoader" src={Dad_Joke_Book} alt="loader"/>
				: <div className="dadJoke">
					<h1>{dadJoke}</h1>
				</div>}
			</div>
		</div>
	)
}

export default Message