import React from 'react';

function Cart(props) {

    const {quantity = 0, handle = Function.prototype} = props

    return (
        <div className="cart blue darken-4 white-text" onClick={handle}>
            <i className="material-icons">add_shopping_cart</i>
            {quantity ? <span className="cart-quantity">{quantity}</span> : null}
        </div>
    );
}

export default Cart;