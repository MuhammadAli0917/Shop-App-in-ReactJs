import React from 'react';
import BasketItem from "./BasketItem";

function BasketList(props) {
    const {order, increment, decrement} = props

    const totalCost = order.reduce((sum, el) => {
        return sum + el.price * el.quantity
    }, 0)

    return (
        <div className="bsk">
            <ul className="collection basket-list">
                <li className="collection-item active">Basket</li>
                {order.length ? order.map(item => <BasketItem increment={increment} decrement={decrement} remove={props.remove} key={item.id} {...item} />)
                    : <li className="collection-item"><b>Basket is empty</b></li>}
                <li className="collection-item active">Total cost: {totalCost} <b>$</b></li>
                <i className="material-icons basket-close" onClick={props.handle}>close</i>
            </ul>
        </div>
    );
}

export default BasketList;