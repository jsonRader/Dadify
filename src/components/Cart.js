import React, { useState, useEffect } from 'react';
import {
    Link
} from 'react-router-dom';
import API from '../api/api';
import CartItems from './CartItems';

const Cart = () => {

	const [cart, setCart] = useState([]);
	const [render, setRender] = useState(0)
	const user_id = localStorage.getItem('UserId')
	useEffect( async function() {
		try {
			// const username = localStorage.getItem('username');
			const data = await API.makeRequest(`/cart/${user_id}`, 'GET');
			setCart(data);
		} catch (error) {
			throw error;
		} 
	}, [render]);

	let total = Number();
	let cartItemElements;
	if(cart.items) {
		const items = cart.items;
		
		items.map((item, i) => {
			total += item.price * item.quantity;
		});
		total = total.toFixed(2);
		console.log(total);
		cartItemElements = cart.items.map((item, i) => {
			return <CartItems cartId={item.cart_id}
							  id={item.id}
							  name={item.name}
							  price={item.price}
							  itemQuantity={item.quantity}
							  key={i}
							  setRender={setRender}/>
		});
	}

	useEffect( async function() {
		const updatedData = {
			total: total
		}
		try {
			const data = await API.makeRequest(`/cart/${user_id}`, 'PATCH', updatedData);
			console.log(data);
		} catch (error) {
			
		}
	}, [render])
	
	return (
		<div id="cart">
			<h1>For The Shopping Cart</h1>
			<Link to="/">Back to Home</Link>
			<div>
				{cartItemElements}
			</div>
			<div>
			<h1>Total: {total}</h1>
			</div>
			<button>Checkout</button>
		</div>
	)
}

export default Cart;