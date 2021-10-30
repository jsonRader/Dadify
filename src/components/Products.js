import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import API from '../api/api';
import {FaTimesCircle} from 'react-icons/fa';

import { TextField } from '@material-ui/core';
import {Button} from '@material-ui/core';

const NewProduct = ({setNewUserProduct, setRender}) => {
    // const [render, setRender] = useState([]);
    const [newProduct, setNewProduct] = useState({name: '', description: '', price: ''});

    function handleChange(event, postKey) {
        const newState = {...newProduct};
        newState[postKey] = event.target.value;
        setNewProduct(newState);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        		try {
			const data = await API.makeRequest('/products', 'POST', newProduct);
			console.log(data);
            setRender(data);
		} catch (error) {
			console.error(error);
		}
        setNewUserProduct(false);
    }

    return (
        <div className="new-post">
            <form>
                <FaTimesCircle 
                    style={{color: '#F9DC94', fontSize: '1.5rem', marginLeft:'60rem'}} 
                    onClick={() => setNewUserProduct(false)}/>
                <div>
                    <TextField 
                        id="add-product"
                        name='name'
                        onChange= {(event) => handleChange(event, 'name')}
                        placeholder='Product Name'
                        required
                    />
                    <TextField 
                        id="add-product"
                        name='description'
                        onChange= {(event) => handleChange(event, 'description')}
                        placeholder='Product Description'
                        multiline="true"
                        required
                    />
                    <TextField 
                        id="add-product"
                        name='price'
                        onChange= {(event) => handleChange(event, 'price')}
                        placeholder='Price: $0.00'
                        required
                    />
                    <Button
                        id="product-button"
                        onClick={handleSubmit}>Add Product
                    </Button>
                </div>
            </form>
        </div>
    )
}

const ProductBoard = ({productBoard, setProductBoard, loggedIn}) => {
    const productId = productBoard.id;
    const isAdmin = productBoard.isAdmin;

console.log('PRODUCT BOARD', productBoard);
console.log('PRODUCT ID', productId);

    async function sendToCart(event, productId) {
        // event.preventDefault();
        try {
            // await API.makeRequest('/cart_item', 'POST', {cartId, productId, quantity})
            //PRODUCT ID SENDS
            console.log('PRODUCT ID SENT:', productId);
        } catch (error) {
            throw error
        }
        // await API.makeRequest('/cart_item', 'POST', {cartId, productId, quantity})

    }

    async function deleteProduct(event, id) {
        // event.preventDefault();
        console.log('DELETE ID IS:', id);
        try {
            const deleteItem = await API.makeRequest(`/products/${id}`, 'DELETE');
            console.log(deleteItem);
        } catch (error) {
            throw error;
        }
    }

    return (
        <div id="featured-post">
            <div className="post-inquiry">
                <button onClick={() => setProductBoard(false)}>CLOSE</button>
                <h1>{productBoard.name}</h1>
                <p>{productBoard.description}</p>
                <h4>${productBoard.price}</h4>
                {loggedIn 
                    ? isAdmin 
                        ? 
                            <div className="post-messages">
                                <div>
                                <button onClick={(e) => sendToCart(e, productId)}>Add to Cart</button>
                                </div>
                                <div>
                                <button onClick={(e) => deleteProduct(e, productId)}>Delete</button>
                                </div>
                                <button>Edit Product</button>
                            </div>
                        :
                            <>
                                <div>
                                <button onClick={(e) => sendToCart(e, productId)}>Add to Cart</button>
                                </div>
                                <div>
                                <button onClick={(e) => deleteProduct(e, productId)}>Delete</button>
                                </div>
                                <button>Edit Product</button>
                            </>
                    : null
                }
            </div>
        </div>
    )
}

const UserProduct = ({product, name, description, price, setProductBoard, isAdmin, productId, deleteProduct}) => {

    return (
        <div className="product-card">
            <div className="product-data">
                <h1>{name}</h1>
                <h2>{description}</h2>
                <h3>${price}</h3>
                <Button
                    id="product-button"
                    variant="contained"
                    color="secondary"
                    onClick={(event) => {
                    event.preventDefault();
                    setProductBoard(product);
                    }}>View More
                </Button>            
            {isAdmin 
                ?
                    <>
                        <button
                            onClick={(event) => {
                                deleteProduct(event, productId);
                            }}>Delete Product
                        </button> 
                    </>
                :
                    ''
            }
            </div>
        </div>
    )
}

const SearchProducts = ({search, setSearch}) => {
    return (
        <fieldset className="product-search">
            <TextField
                id="product-search"
                placeholder="Search Products..."
                value={search}
                onChange={(event) => setSearch(event.target.value)} 
            />
        </fieldset>
    )
}

const Products = ({
    loggedIn, 
    userProducts, 
    setUserProducts, 
    productBoard, 
    setProductBoard
}) => {
    const [newUserProduct, setNewUserProduct] = useState(false);
    const [search, setSearch] = useState('')

    const [render, setRender] = useState([]);

    const filteredProducts = search.length === 0 
        ? userProducts 
        : userProducts.filter(product => product.description.toLowerCase().includes(search.toLowerCase()) || 
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.price.includes(search)
        );

    useEffect(async function() {
        const data = await API.makeRequest('/products', 'GET')
        setUserProducts(data);
    }, [render])

    return (
        <div id="products">
            <div className="posts-header-image">
                <section className="page-header">
                    <h1 className="header-text">Products</h1>
                </section>
            </div>
            <div className="filter">
                <SearchProducts 
                    userProducts={userProducts}
                    setUserProducts={setUserProducts}
                    search={search}
                    setSearch={setSearch}
                />
                {loggedIn && <Button id="product-button"
                onClick={(event) => {
                                     event.preventDefault();
                                     setNewUserProduct(true)}}>
                                     Add Product
                             </Button>
                }
            </div>
            <div className="add-product">
                {newUserProduct && <NewProduct setNewUserProduct={setNewUserProduct} setRender={setRender}/>}
            </div>
            <div className="products">

            <section className="products-container">

                {filteredProducts.map((product, index) => 
                    // <div className="single-product">
                    <UserProduct 
                    product={product}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        setProductBoard={setProductBoard}
                        key={index}
                        isAdmin={product.isAdmin}
                        productId={product.id}
                    />
                    // </div>
                    )}  
                    </section> 
            </div>
            {!productBoard
                ?
                    <>
                    </>
                : <ProductBoard
                    productBoard={productBoard}
                    setProductBoard={setProductBoard}
                    loggedIn={loggedIn}
                />
            }       
        </div>
    )
}

export default Products;