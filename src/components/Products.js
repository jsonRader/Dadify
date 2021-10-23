import React, {useState, useEffect} from 'react';
import {
    Link
} from 'react-router-dom';

import API from '../api/api';

const Products = () => {
	const [products, setProducts] = useState([]);

	useEffect( async function() {
		try {
			// const username = localStorage.getItem('username');
			const data = await API.makeRequest('/products', 'GET');
			setProducts(data);
		} catch (error) {
			throw error;
		} 
	}, []);


	return (
		<div id="message">
			<h1>Buy Some Things To Keep You "Hip and Cool"</h1>
			<Link to="/">Back to Home</Link>

			<div>
					{products.map((product, id) => {
						return (
							<div key={id} className= "single-product">
								<h1>PRODUCT: {product.name}</h1>
								<h2>DESCRIPTION: {product.description}</h2>
								<h3>PRICE: ${product.price}</h3>
							</div>
						)
					})}
				</div>



		</div>
	)
}

export default Products