import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import API from '../api/api';
import {FaTimesCircle} from 'react-icons/fa';
import {TextField} from '@material-ui/core';
import {Button} from '@material-ui/core';

const NewProduct = ({setNewUserProduct, setRender, isAdmin}) => {
    const [newProduct, setNewProduct] = useState({name: '', description: '', price: ''});

    function handleChange(e, postKey) {
        const newState = {...newProduct};
        newState[postKey] = e.target.value;
        setNewProduct(newState);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
			const data = await API.makeRequest('/products', 'POST', newProduct);
			// console.log(data);
            setRender(data);
		} catch (error) {
			console.error(error);
		}
        setNewUserProduct(false);
    }

    return (
        <>
            {isAdmin ?
                <div className="new-post">
                    <form>
                        <FaTimesCircle 
                            style={{color: '#F9DC94', fontSize: '1.5rem', marginLeft:'60rem'}} 
                            onClick={() => setNewUserProduct(false)}
                        />
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
            :
                <>
                </>
            }
        </>
    )
}

const EditProduct = ({setRender, productBoard, setProductBoard, isAdmin, setEditProduct}) => {
    // console.log('PRODUCT BOARD:', productBoard);
    const [newEditProduct, setNewEditProduct] = useState({name: '', description: '', price: ''});

    function handleChange(e, postKey) {
        const newState = {...newEditProduct};
        newState[postKey] = e.target.value;
        setNewEditProduct(newState);
    }

    const productId = productBoard.id;
    // console.log('EDIT PRODUCT ID:', productId);

    async function handleSubmit(id) {
        // console.log('PRODUCT IS:', product);
        // console.log(id);
        // event.preventDefault();
        try {
			const data = await API.makeRequest(`/products/${id}`, 'PATCH', newEditProduct);
			// console.log(data);
            setRender(data);
		} catch (error) {
			console.error(error);
		} finally {
            setEditProduct(false);
            setProductBoard(false);
        }
    }

    return (
        <>
            {isAdmin ?
                <div className="new-post">
                    <form>
                        <FaTimesCircle 
                            style={{color: '#F9DC94', fontSize: '1.5rem', marginLeft:'60rem'}} 
                            onClick={() => setEditProduct(false)}
                        />
                        <div>
                            <TextField 
                                id="add-product"
                                name='name'
                                onChange= {(event) => handleChange(event, 'name')}
                                // placeholder={productBoard.name}
                                placeholder='Product Name'
                                required
                            />
                            <TextField 
                                id="add-product"
                                name='description'
                                onChange= {(event) => handleChange(event, 'description')}
                                // placeholder={productBoard.description}
                                placeholder='Product Description'
                                multiline="true"
                                required
                            />
                            <TextField 
                                id="add-product"
                                name='price'
                                onChange= {(event) => handleChange(event, 'price')}
                                // placeholder={productBoard.price}
                                placeholder="$0.00"
                                required
                            />
                            <Button
                                id="product-button"
                                onClick={(e) => handleSubmit(e, productId)}
                            >Confirm Product Updates
                            </Button>
                        </div>
                    </form>
                </div>
            :
                <>
                </>
            }
        </>
    )
}

const ProductBoard = ({
    productBoard, setProductBoard,
    editProduct, setEditProduct,
    isAdmin, setRender
}) => {
    const productId = productBoard.id;
    console.log('PRODUCT BOARD', productBoard);
    console.log('PRODUCT ID', productId);
    const cart_id = localStorage.getItem('cartId');

    async function sendToCart(e, product_id) {
        const quantity = 1;
        const itemData = {cart_id, product_id, quantity};
        try {
            if(!loggedIn) {
                const non_userCart = JSON.parse(localStorage.getItem('NonUserCart'));
                console.log(non_userCart);
                productBoard["quantity"] = 1;
                non_userCart.items.push(productBoard);
                localStorage.setItem("NonUserCart", JSON.stringify(non_userCart));
                setProductBoard(false);
                return;
            }
            console.log('PRODUCT ID SENT:', productId);
            await API.makeRequest('/cart_item', 'POST', itemData);
            setProductBoard(false);
        } catch (error) {
            throw error
        }
    }

    async function deleteProduct(id) {
        // console.log('DELETE ID IS:', id);
        try {
            const deleteItem = await API.makeRequest(`/products/${id}`, 'DELETE');
            // console.log(deleteItem);
            setProductBoard(false);
        } catch (error) {
            throw error;
        } finally {
            setRender(Math.random());
        }
    }

    // console.log(isAdmin);
    return (
        <div className="featured-product">
            <div className="product-inquiry">
                <FaTimesCircle 
                    style={{marginLeft: '95%', color: '#C41419', fontSize: '1.5rem'}} 
                    onClick={() => setProductBoard(false)}
                />
                <h1>{productBoard.name}</h1>
                <h2>{productBoard.description}</h2>
                <h3>${productBoard.price}</h3>
                {isAdmin ? 
                    <div>
                        <div>
                            <Button
                                id="admin-button" 
                                variant="contained"
                                color="secondary"
                                onClick={(e) => sendToCart(e, productId)}
                            >Add to Cart</Button>
                        </div>
                        <div>
                            <Button
                                id="admin-button" 
                                variant="contained"
                                color="secondary"
                                onClick={(e) => {e.preventDefault(); setEditProduct(true)}}
                            >Edit Product</Button>
                        </div>
                        <div className="add-product">
                            {editProduct && <EditProduct 
                                productBoard={productBoard} 
                                setProductBoard={setProductBoard} 
                                setEditProduct={setEditProduct} 
                                isAdmin={isAdmin} 
                                setRender={setRender}
                            />}
                        </div>
                        <div>
                            <Button 
                                id="admin-button" 
                                variant="contained"
                                color="secondary"
                                onClick={(e) => {deleteProduct(e, productId); setProductBoard(false)}}
                            >Delete</Button>
                        </div>
                    </div>
                :
                    <>
                        <div>
                            <Button 
                                id="visitor-button" 
                                variant="contained"
                                color="secondary"
                                onClick={(e) => sendToCart(e, productId)}
                            >Add to Cart</Button>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

const UserProduct = ({product, image, name, description, price, setProductBoard}) => {
    // console.log(product);
    // console.log(image);

    return (
        <div className="product-card">
            <div className="product-data">
                <h1>{name}</h1>
                <img className="product-picture" src={(`${process.env.PUBLIC_URL}/product_images/${image}`)} />
                <h2>{description}</h2>
                <h3>${price}</h3>
                <Button
                    id="product-button"
                    variant="contained"
                    color="secondary"
                    onClick={(e) => {e.preventDefault(); setProductBoard(product);}}
                >View More</Button>
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
                onChange={(e) => setSearch(e.target.value)} 
            />
        </fieldset>
    )
}

const Products = ({
    loggedIn, isAdmin,
    userProducts, setUserProducts, 
    productBoard, setProductBoard
}) => {
    const [newUserProduct, setNewUserProduct] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    const [search, setSearch] = useState('');
    const [render, setRender] = useState([]);

    const filteredProducts = search.length === 0 
        ? userProducts 
        : userProducts.filter(product => 
            product.description.toLowerCase().includes(search.toLowerCase()) || 
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
                {isAdmin && <Button 
                    id="product-button"
                    onClick={(e) => {e.preventDefault(); setNewUserProduct(true)}}
                >Add Product</Button>
                }
            </div>
            <div className="add-product">
                {newUserProduct && <NewProduct 
                    setNewUserProduct={setNewUserProduct} 
                    isAdmin={isAdmin} setRender={setRender}
                />}
            </div>
            <div className="products">
                <section className="products-container">
                    {filteredProducts.map((product, index) => 
                        <UserProduct 
                            product={product}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            image={product.image}
                            setProductBoard={setProductBoard}
                            key={index}
                            isAdmin={product.isAdmin}
                            productId={product.id}
                        />
                    )}  
                </section> 
            </div>
            {!productBoard ?
                <>
                </>
            : <ProductBoard
                productBoard={productBoard}
                setProductBoard={setProductBoard}
                loggedIn={loggedIn}
                isAdmin={isAdmin}
                editProduct={editProduct}
                setEditProduct={setEditProduct}
                setRender={setRender}
            />
            }       
        </div>
    )
}

export default Products;