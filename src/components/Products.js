import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {FaTimesCircle} from 'react-icons/fa'
import API from '../api/api';


const AddNewProduct = ({setNewUserProduct}) => {
    const [newProduct, setNewProduct] = useState({name: '', description: '', price: ''});

	function handleChange(event, postKey) {
        const newState = {...newProduct};
        newState[postKey] = event.target.value;
        setNewProduct(newState);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
		try {
			const data = await API.makeRequest('/products', 'POST', newProduct);
			console.log(data);
		} catch (error) {
			console.error(error);
		}
    }

    return (
        <div className="new-post">
            <form>
                <FaTimesCircle 
                    style={{color: 'red', fontSize: '1.5rem', marginLeft:'37rem'}} 
                    onClick={() => setNewUserProduct(false)}
                />
                <div>
                    <input 
                        style={{marginTop: '1rem', marginLeft: '3rem', width: '33rem'}}
                        name="name"
                        placeholder="Name"
                        label="Name"
                        onChange= {(event) => handleChange(event, 'name')}
                        required
                    />
                    <input 
                        style={{marginTop: '2rem', marginLeft: '3rem', width: '33rem'}}
                        name="description"
                        placeholder="Description"
                        label='Description'
                        onChange= {(event) => handleChange(event, 'description')}
                        multiline="true"
                        required
                    />
                    <input
                        style={{marginTop: '2rem', marginLeft: '3rem', width: '33rem'}}
                        name="price"
                        placeholder="Price"
                        label='Price $'
                        onChange= {(event) => handleChange(event, 'price')}
                        required
                    />
                    <button 
                        style={{marginTop:'1rem', marginLeft: '3rem', width: '33rem'}}
                        onClick={handleSubmit}
                    >
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    )
}

const EditProduct = ({setEditProduct, productId}) => {
    const [patchProduct, setPatchProduct] = useState({name: '', description: '', price: ''});

	function handleChange(event, postKey) {
        const newState = {...patchProduct};
        newState[postKey] = event.target.value;
        setPatchProduct(newState);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
		try {
			const data = await API.makeRequest(`/products/${productId}`, 'PATCH', patchProduct);
			console.log(data);
		} catch (error) {
			console.error(error);
		}
    }

    async function deleteProduct(e) {
        try {
            const deleteItem = await API.makeRequest(`/products/${productId}`, 'DELETE');
            console.log(deleteItem);
        } catch (error) {
            throw error;
        }
    }

    return (
        <div className="new-post">
            <button 
                        style={{marginTop:'1rem', marginLeft: '3rem', width: '33rem'}}
                        onClick={(e) => deleteProduct(e)}
                    >
                        Delete
                    </button>
            <form>
                <FaTimesCircle 
                    style={{color: 'red', fontSize: '1.5rem', marginLeft:'37rem'}} 
                    onClick={() => setEditProduct(false)}
                />
                <div>
                    <input 
                        style={{marginTop: '1rem', marginLeft: '3rem', width: '33rem'}}
                        name="name"
                        placeholder="Name"
                        label="Name"
                        onChange= {(event) => handleChange(event, 'name')}
                        required
                    />
                    <input 
                        style={{marginTop: '2rem', marginLeft: '3rem', width: '33rem'}}
                        name="description"
                        placeholder="Description"
                        label='Description'
                        onChange= {(event) => handleChange(event, 'description')}
                        multiline="true"
                        required
                    />
                    <input
                        style={{marginTop: '2rem', marginLeft: '3rem', width: '33rem'}}
                        name="price"
                        placeholder="Price"
                        label='Price $'
                        onChange= {(event) => handleChange(event, 'price')}
                        required
                    />
                    <button 
                        style={{marginTop:'1rem', marginLeft: '3rem', width: '33rem'}}
                        onClick={handleSubmit}
                    >
                        Update
                    </button>
                    {/* <button 
                        style={{marginTop:'1rem', marginLeft: '3rem', width: '33rem'}}
                        onClick={(e) => deleteProduct(e)}
                    >
                        Delete
                    </button> */}
                </div>
            </form>
        </div>
    )
}

const Products = ({loggedIn}) => {
	const [products, setProducts] = useState([]);

	const [newUserProduct, setNewUserProduct] = useState(false);
    const [editProduct, setEditProduct] = useState(false, null);
    // const [deleteProduct, setDeleteProduct] = useState(false);

	useEffect(async function() {
		try {
			const data = await API.makeRequest('/products', 'GET');
			setProducts(data);
		} catch (error) {
			throw error;
		} 
	}, []);

	return (
		<div className="product-page">
			<div className="new-product">
			{loggedIn && 
                    <button
                        style={{height: '3rem', marginTop: '.8rem'}}
                        color="primary"
                        variant="outlined"
                        onClick={(event) => {
                            event.preventDefault();
                            setNewUserProduct(true)}}
                    >
                        Create Product
                    </button>
                }
			</div>
			{newUserProduct && <AddNewProduct setNewUserProduct={setNewUserProduct}/>}
			<div>
				{products.map((product, id) => {
					return (
						<div key={id} className= "single-product">
							<h1>{product.name}</h1>
							<h2>{product.description}</h2>
							<h3>${product.price}</h3>
							{loggedIn 
                ?
                    <>
                        <button
                        style={{height: '3rem', marginTop: '.8rem'}}
                        onClick={(event) => {
                            event.preventDefault();
                            setEditProduct(true, id)}}
                    >
                        Edit Product
                    </button>
                    {editProduct && <EditProduct setEditProduct={setEditProduct}/>}

                    </>
                :
                    ''
            }
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Products