import React, {useState, useEffect} from 'react';
import Loader from "./Loader";
import {API_KEY, API_URL} from "../config";
import GoodList from "./GoodList";
import Cart from "./Cart";
import BasketList from "./BasketList";
import {toast} from "react-toastify";

function Shop() {
    const [goods, setGoods] = useState([])
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState([])
    const [isBasketShow, setBasketShow] = useState(false)

    useEffect(() => {
        fetch(API_URL, {
            headers: {
                Authorization: API_KEY,
            },
        }).then((response) => response.json())
            .then((data) => {
                data.featured && setGoods(data.featured)
                setLoading(false)
            })
    }, [])
    const addToBasket = (item) => {
        const itemIndex = order.findIndex(orderItem => orderItem.id === item.id)

        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1
            }
            setOrder([...order, newItem])
        } else {
            const newOrder = order.map((orderItem, index) => {
                if (itemIndex === index) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1
                    }
                } else {
                    return {
                        item
                    }
                }
            })
            setOrder(newOrder)
        }
        toast.success("Product added to basket successfully")
    }
    const handleBasketShow = () => {
        setBasketShow(!isBasketShow)
    }
    const removeFromBasket = (itemID) => {
        const newOrder = order.filter(item => item.id !== itemID)
        setOrder(newOrder)
        toast.error("Product deleted from basket successfully")
    }
    const incrementQuantity = (itemId) => {
        const newOrder = order.map(el => {
            if (el.id === itemId) {
                return {
                    ...el,
                    quantity: el.quantity + 1
                }
            } else {
                return el
            }
        })
        setOrder(newOrder)
    }
    const decrementQuantity = (itemId) => {
        const newOrder = order.map(el => {
            if (el.id === itemId) {
                return {
                    ...el,
                    quantity: el.quantity >= 1 ? el.quantity - 1 : 0
                }
            } else {
                return el
            }
        })
        setOrder(newOrder)
    }

    return (
        <div className="container content">
            <Cart quantity={order.length} handle={handleBasketShow} />
            {loading ? <Loader /> : <GoodList addToBasket={addToBasket} goods={goods} />}
            {isBasketShow && <BasketList decrement={decrementQuantity} remove={removeFromBasket} handle={handleBasketShow} increment={incrementQuantity} order={order} />}
        </div>
    );
}

export default Shop;