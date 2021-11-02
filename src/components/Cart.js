import {Button} from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import API from '../api/api';
import CartItems from './CartItems';

const Cart = ({loggedIn}) => {

	const history = useHistory();
	const [cart, setCart] = useState([]);
	const [render, setRender] = useState(0);
	const [confirmation, setConfirmation] = useState(false);
	const user_id = localStorage.getItem('UserId');

	useEffect(async function() {
		try {
			// const username = localStorage.getItem('username');
			if(loggedIn) {
				const data = await API.makeRequest(`/cart/${user_id}`, 'GET');
				setCart(data);
			} else {
				const nonUser = JSON.parse(localStorage.getItem('NonUserCart'));
				setCart(nonUser);
				console.log(cart)
			}
		} catch (error) {
			throw error;
		} 
	}, [render]);


	async function checkout(e) {
		try {
			if(loggedIn) {
				setConfirmation(true);
				await API.makeRequest(`/cart_item/clear_cart/${cart.id}`, 'DELETE');
			} else {
				setConfirmation(true);
				const emptyCart = {
					total: 0.00,
					items: []
				};
				localStorage.setItem("NonUserCart", JSON.stringify(emptyCart));
			}
		} catch (error) {
			throw error;
		}
	}

	function backToHome(e) {
		setConfirmation(false);
		history.push('/')
	}

	let total = Number();
	let cartItemElements = [];

	if(cart.items) {
		const items = cart.items;
		
		items.map((item, i) => {
			total += item.price * item.quantity;
		});

		total = total.toFixed(2);
		cartItemElements = cart.items.map((item, i) => {

			return <CartItems cartId={item.cart_id}
							  id={item.id}
							  name={item.name}
							  price={item.price}
							  itemQuantity={item.quantity}
							  key={i}
							  index={i}
							  setRender={setRender}
							  loggedIn={loggedIn}/>
		});
	}

	useEffect(async function() {
		const updatedData = {total: total}
		try {
			const data = await API.makeRequest(`/cart/${user_id}`, 'PATCH', updatedData);
			// console.log(data);
		} catch (error) {
			throw error;
		}
	}, [render])
	
	return (
		<div id="cart">
			<div className='cart-header'>
				<h1>For The Shopping Cart</h1>
				<Link to="/">Back to Home</Link>
			</div>
			<div className='cart-items'>
				{cart.items ?
					<>
						{cartItemElements}
						<div className='cart-footer'>
							<h1>Total: {total}</h1>
						</div>
						<Button 
							id='cart-button' 
							onClick={(e) => checkout(e)}
						>Checkout</Button>
					</>
				:
					<div>
						<h2>No items in the cart.</h2>
					</div>
				}
			</div>
			{confirmation ?
				<div className='confirmation-page'>
					<div className='confirmation-content'>
						<h2>Order Confirmed!</h2>
						<Button 
							onClick={(e) => backToHome(e)}
						>Return to Home</Button>
					</div>
				</div>
			:
				<>
				</>
			}
		</div>
	)
}

export default Cart;