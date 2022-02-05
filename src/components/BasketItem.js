import React from 'react';

function BasketItem(props) {
    const {id, name, price, quantity, increment, decrement} = props
    return (
        <li className="collection-item">
            {name} x {quantity} = {price * quantity}<b>$</b>
             <span className="secondary-content">
                 <a className="waves-effect waves-light btn btnq" onClick={() => increment(id)}><i className="material-icons left">exposure_plus_1</i> Add</a>
                 <a className="waves-effect waves-light btn btnq" style={{margin: "0px 10px"}} onClick={() => decrement(id)}><i className="material-icons left">exposure_minus_1</i> Remove</a>
                 <a className="waves-effect waves-light btn btnq" onClick={() => props.remove(id)}><i className="material-icons basket-delete left">delete_forever</i> Delete</a>
            </span>
        </li>
    );
}

export default BasketItem;