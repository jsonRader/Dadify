import React, {useState} from 'react';
import {__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED} from 'react';
import API from '../api/api';
import {Button} from '@material-ui/core';


const CartItems = ({cartId, id, name, price, productId, itemQuantity, setRender, loggedIn, index}) => {

    const [updateQuantity, setUpdateQuantity] = useState({quantity: itemQuantity});
    const [editItem, setEditItem] = useState(false);

    function updateItemQuantity(e) {
        setUpdateQuantity({quantity: Number(e.target.value)})
        // console.log(updateQuantity);
        // console.log(id);
    }

    async function submitEdit(e) {
        try {
            if(loggedIn) {
                const data = await API.makeRequest(`/cart_item/${id}`, 'PATCH', updateQuantity);
                setRender(updateQuantity.quantity);
            } else {
                itemQuantity = updateQuantity;
                const non_User = JSON.parse(localStorage.getItem("NonUserCart"));
                non_User.items[index].quantity = updateQuantity.quantity;
                localStorage.setItem("NonUserCart", JSON.stringify(non_User));
            }
            
            // console.log(data);
        } catch (error) {
            throw error;
        } finally {
            setEditItem(false);
            setRender(updateQuantity.quantity);
        }
    }

    async function removeItem(e) {
        try {
            if(loggedIn) {
                const deleteItem = await API.makeRequest(`/cart_item/${id}`, 'DELETE');
            } else {
                const nonUserCart = JSON.parse(localStorage.getItem("NonUserCart"));
                nonUserCart.items.splice(index, 1);
                localStorage.setItem("NonUserCart", JSON.stringify(nonUserCart));
            }
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