import React, {useState} from 'react';
import {__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED} from 'react';
import API from '../api/api';
import {Button} from '@material-ui/core';


const CartItems = ({cartId, id, name, price, productId, itemQuantity, setRender, loggedIn}) => {

    const [updateQuantity, setUpdateQuantity] = useState({quantity: itemQuantity});
    const [editItem, setEditItem] = useState(false);

    function updateItemQuantity(e) {
        setUpdateQuantity({quantity: Number(e.target.value)})
        // console.log(updateQuantity);
        // console.log(id);
    }

    async function submitEdit(e) {
        try {
            const data = await API.makeRequest(`/cart_item/${id}`, 'PATCH', updateQuantity);
            // console.log(data);
        } catch (error) {
            throw error;
        } finally {
            setRender(updateQuantity.quantity);
            setEditItem(false);
        }
    }

    async function removeItem(e) {
        try {
            const deleteItem = await API.makeRequest(`/cart_item/${id}`, 'DELETE');
            // console.log(deleteItem);
        } catch (error) {
            throw error;
        } finally {
            setRender(Math.random())
        }
    }

    return (
        <div className='cart-item'>
            <h2>Name: {name}</h2>
            <br></br>
            <h3>Price: {price}</h3>
            {editItem ?
                <>
                    <h3>Quantity: 
                        <input 
                            type='number' 
                            defaultValue={itemQuantity} 
                            onChange={(e) => updateItemQuantity(e)}
                        />
                    </h3>
                    <Button 
                        id='cart-button' 
                        style={{marginRight:'2px'}} 
                        onClick={(e) => submitEdit(e)}
                    >Update</Button>

                    <Button 
                        id='cart-button' 
                        style={{marginLeft: '2px'}} 
                        onClick={() => setEditItem(false)}
                    >Cancel</Button>
                </>
            :
                <h3>Quantity: 
                    {itemQuantity}
                    <Button 
                        style={{marginLeft: '6px', marginBottom: '18px'}} 
                        id='cart-button' 
                        onClick={() => setEditItem(true)}
                    >Change</Button>
                </h3>
            }
            <div>
                <Button id='cart-button' onClick={(e) => removeItem(e)}>Remove Item</Button>
            </div>
        </div>
    )
}

export default CartItems;