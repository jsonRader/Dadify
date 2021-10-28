import React, {useState, useEffect} from 'react';
import {
    Link
} from 'react-router-dom';

import API from '../api/api';

const ProductPage = (id) => {
    const [product, setProduct] = useState([])

    useEffect( async function() {
        try {
            const data = await API.makeRequest('/products', 'GET');
            setProduct(data);
        } catch (error) {
            throw error
        }
    }, []);

    return (
        <div id="message">
            {product.map((product) => {
                if(product.id === id){
                    return(
                        <div key={id} className="single-product">
                            	<h1>PRODUCT: {product.name}</h1>
								<h2>DESCRIPTION: {product.description}</h2>
								<h3>PRICE: ${product.price}</h3>
							</div>
                    )
                }
            })}

        </div>
    )

}

export default ProductPage