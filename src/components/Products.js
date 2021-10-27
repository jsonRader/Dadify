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
                        color='primary'
                        variant='outlined' 
                        name="name"
                        placeholder="Name"
                        label="Name"
                        onChange= {(event) => handleChange(event, 'name')}
                        required
                    />
                    <input 
                        style={{marginTop: '2rem', marginLeft: '3rem', width: '33rem'}}
                        color='primary'
                        variant='outlined'
                        name="description"
                        placeholder="Description"
                        label='Description'
                        onChange= {(event) => handleChange(event, 'description')}
                        multiline="true"
                        required
                    />
                    <input
                        style={{marginTop: '2rem', marginLeft: '3rem', width: '33rem'}}
                        color='primary'
                        variant='outlined'
                        name="price"
                        placeholder="Price"
                        label='Price $'
                        onChange= {(event) => handleChange(event, 'price')}
                        required
                    />
                    <button 
                        style={{marginTop:'1rem', marginLeft: '3rem', width: '33rem'}}
                        color='primary'
                        variant='outlined'
                        onClick={handleSubmit}
                    >
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    )
}


// const EditProduct = () => {
    // const location = useLocation();
    // const history = useHistory();
    // const {id, name, description, price} = location.state;
    // const [editProduct, setEditProduct] = useState({name: '', description: '', price: ''})

    // function handleChange(
    //     // event, postKey
    //     ) {
    //     const newState = {...editProduct};
    //     // {postKey === 'isPublic' ? newState[postKey] = event.target.checked ? true : false : newState[postKey] = event.target.value};
    //     setEditProduct(newState);
    // }

    // const [newProduct, setNewProduct] = useState({name: '', description: '', price: ''});

	// function handleChange(event, postKey) {
    //     const newState = {...newProduct};
    //     newState[postKey] = event.target.value;
    //     setNewProduct(newState);
    // }

    // async function deleteProduct(e) {
    //     event.preventDefault();
    //     try {
    //         await API.makeRequest(`/products/${id}`, 'DELETE')
    //     } catch (error) {
    //         throw error;
    //     }
    //     history.push('/products');
    // }

    // async function handleSubmit(e) {
    //     try {
    //         await API.makeRequest(`/products/${id}`, 'PATCH', EditProduct);

    //     } catch (error) {
    //         throw error;
    //     }
    //     history.push('/products')
    // }

    // async function deleteActivity(e, activityId) {
    //     try {
    //         await API.makeRequest(`/routine_activities/${activityId}`, 'DELETE')
    //     } catch (error) {
    //         throw error;
    //     }

    // }

//     return (
//         <div className='edit-routine'>
//             <h1>Edit Product</h1>
//                 <input value={name}
//                            label='Name'
//                            placeholder="Name"
//                            type='text'
//                            color='primary'
//                         //    sx={{marginBottom: 3}}
//                            onChange={(e) => handleChange(e, 'name')}
//                            />
//                 <input value={description}
//                            label='description'
//                            placeholder="description"
//                            type='text'
//                            color='primary'
//                            onChange={(e) => handleChange(e, 'description')}
//                            />
//                 <input value={price}
//                            label='price'
//                            placeholder="price"
//                            type='text'
//                            color='primary'
//                            onChange={(e) => handleChange(e, 'price')}
//                            />
//                     <button onClick={(e) => deleteProduct(e)}>Delete</button>
//                     <button onClick={(e) => history.push('/products')}>Cancel</button>
//                     <button onClick={(e) => handleSubmit(e)}>Submit</button>
//                 </div>
//     )
// }

const Products = ({loggedIn}) => {
	const [products, setProducts] = useState([]);
	const [newUserProduct, setNewUserProduct] = useState(false);

	useEffect(async function() {
		try {
			const data = await API.makeRequest('/products', 'GET');
			setProducts(data);
		} catch (error) {
			throw error;
		} 
	}, []);

	// async function deleteProduct(event, id) {
    //     event.preventDefault();
	// 	try {
	// 		const data = await API.makeRequest(`/products/:${id}`, 'DELETE', id)
	// 		setProducts(data)
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
    // }

    // async function editProduct(event, id) {
    //     event.preventDefault();
	// 	try {
	// 		const data = await API.makeRequest(`/products/:${id}`, 'PATCH', id)
	// 		setProducts(data)
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
    // }

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
	// 	try {
	// 		const data = await API.makeRequest('/products', 'POST', newProduct);
	// 		console.log(data);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
    // }

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
							{/* {loggedIn 
                ?
                    <>
                        <button
                            onClick={(event) => {
                                deleteProduct(event, product);
                            }}>Delete Listing
                        </button> 
                        <form>
                <FaTimesCircle 
                    style={{color: 'red', fontSize: '1.5rem', marginLeft:'37rem'}} 
                    onClick={() => setNewUserProduct(false)}
                />
                <div>
                    <input 
                        style={{marginTop: '1rem', marginLeft: '3rem', width: '33rem'}}
                        color='primary'
                        variant='outlined' 
                        name="name"
                        placeholder="Name"
                        label="Name"
                        onChange= {(event) => handleChange(event, 'name')}
                        required
                    />
                    <input 
                        style={{marginTop: '2rem', marginLeft: '3rem', width: '33rem'}}
                        color='primary'
                        variant='outlined'
                        name="description"
                        placeholder="Description"
                        label='Description'
                        onChange= {(event) => handleChange(event, 'description')}
                        multiline="true"
                        required
                    />
                    <input
                        style={{marginTop: '2rem', marginLeft: '3rem', width: '33rem'}}
                        color='primary'
                        variant='outlined'
                        name="price"
                        placeholder="Price"
                        label='Price $'
                        onChange= {(event) => handleChange(event, 'price')}
                        required
                    />
                    <button 
                        style={{marginTop:'1rem', marginLeft: '3rem', width: '33rem'}}
                        color='primary'
                        variant='outlined'
                        onClick={handleSubmit}
                    >
                        Create Product
                    </button>
                </div>
            </form>
                    </>
                :
                    ''
            } */}
						</div>
					)
				})}
				
			</div>
		</div>
	)
}

export default Products