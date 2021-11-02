import React from 'react';
import {Link, useHistory} from 'react-router-dom';

const Header = ({loggedIn, setLoggedIn, isAdmin}) => {
	const history = useHistory();

	function logOut(event) {
		event.preventDefault();
		localStorage.removeItem('Token')
		localStorage.removeItem('cartId');
		localStorage.removeItem('UserId');
		localStorage.removeItem('Username');
		setLoggedIn(null);
		history.push('/')
	}

	return (
		<header>
			<h1>Dadify-Dot-Com</h1>
			<div id="nav-bar">
                <Link to="/" className="navItem">Home</Link>
				<Link to="/products" className="navItem">Products</Link>
				<Link to="/cart" className="navItem">Cart</Link>
                <Link to="/jokes" className="navItem">Joke Book</Link>

				{isAdmin ?
					<Link to="/admin" className="navItem">Admin</Link>
				: '' }

				{loggedIn ?
					<>
						<Link className="navItem" onClick={logOut}>Log Out</Link>
					</>
					: <Link to="/LogIn" className="navItem">Log In</Link>
				}
			</div>
		</header>
	)
}

export default Header;