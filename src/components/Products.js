import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import API from '../api/api';

const NewProduct = ({setNewUserProduct}) => {
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
		} catch (error) {
			console.error(error);
		}
        setNewUserProduct(false);
    }

    return (
        <div className="new-post">
            <form>
                <button onClick={() => setNewUserProduct(false)}>CLOSE</button>
                <div>
                    <input 
                        name='name'
                        onChange= {(event) => handleChange(event, 'name')}
                        placeholder='name'
                        required
                    />
                    <input 
                        name='description'
                        onChange= {(event) => handleChange(event, 'description')}
                        placeholder='Description'
                        multiline="true"
                        required
                    />
                    <input 
                        name='price'
                        onChange= {(event) => handleChange(event, 'price')}
                        placeholder='Price'
                        required
                    />
                    <button onClick={handleSubmit}>Add Product</button>
                </div>
            </form>
        </div>
    )
}

const ProductBoard = ({productBoard, setProductBoard, loggedIn}) => {
    const productId = productBoard._id;
    const isAdmin = productBoard.isAdmin;

    function sendToCart(event) {
        event.preventDefault();
        //SEND TO CART
    }

    async function deleteProduct(event, id) {
        event.preventDefault();
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
                                <button onClick={sendToCart}>Add to Cart</button>
                                </div>
                                <div>
                                <button onClick={deleteProduct}>Delete</button>
                                </div>
                                {/* <button onClick={editProduct}>Edit Product</button> */}
                            </div>
                        :
                            <>
                                <div>
                                <button onClick={sendToCart}>Add to Cart</button>
                                </div>
                                <div>
                                <button onClick={deleteProduct}>Delete</button>
                                </div>
                                {/* <button onClick={editProduct}>Edit Product</button> */}
                            </>
                    : null
                }
            </div>
        </div>
    )
}

const UserProduct = ({product, name, description, price, setProductBoard, isAdmin, productId, deleteProduct}) => {

    return (
        <div id="user-post">
            <h2>{name}</h2>
            <p>{description}</p>
            <h4>Price: {price}</h4>
            <button
                onClick={(event) => {
                    event.preventDefault();
                    setProductBoard(product);
                }}>View More
            </button>            
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
    )
}

const SearchProducts = ({search, setSearch}) => {
    return (
        <input 
            variant="filled"
            placeholder="Search Products..."
            type='text'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
        />
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

    const filteredProducts = search.length === 0 
        ? userProducts 
        : userProducts.filter(product => product.description.toLowerCase().includes(search.toLowerCase()) || 
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.price.includes(search)
        );

    useEffect(async function() {
        const data = await API.makeRequest('/products', 'GET')
        setUserProducts(data);
    }, [])

    return (
        <div className="product-page">
            <div className="posts-header">
                <h1>Products</h1>
                <SearchProducts 
                    userProducts={userProducts}
                    setUserProducts={setUserProducts}
                    search={search}
                    setSearch={setSearch}
                />
                {loggedIn && <button onClick={(event) => {
                                     event.preventDefault();
                                     setNewUserProduct(true)}}>
                                     Add Product
                             </button>
                }
            </div>
            {newUserProduct && <NewProduct setNewUserProduct={setNewUserProduct}/>}
            <div className="single-product">
                {filteredProducts.map((product, index) => 
                    <UserProduct 
                    product={product}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        setProductBoard={setProductBoard}
                        key={index}
                        isAdmin={product.isAdmin}
                        productId={product._id}
                    />)}   
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