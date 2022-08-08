import { successMsg } from '../helpers/Toastify';
export const ACTIONS = {
    NOTIFY: 'NOTIFY',
    AUTH: 'AUTH',
    ADD_TO_CART: 'ADD_TO_CART',
    ADD_MODAL: 'ADD_MODAL',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    GET_ORDER: 'GET_ORDER',
}


export const addToCart = (product, cart) =>
{
    successMsg(`${product.title} is added to cart`)
    return ({
        type: 'ADD_TO_CART',
        payload: [...cart, { ...product, quantity: 1 }]
    })

    // console.log("🚀 ~ file: Actions.js ~ line 22 ~ check", check)
    // if (!check || check === 0) {
    // } else {

    //     return ({ type: 'ADD_TO_CART', payload: cart })
    // }

}

export const decrease = (data, id) =>
{
    const newData = [...data]
    newData.forEach(item =>
    {
        if (item._id === id) item.quantity -= 1
    })

    return ({ type: 'ADD_TO_CART', payload: newData })
}

export const increase = (data, id) =>
{
    const newData = [...data]
    newData.forEach(item =>
    {
        if (item._id === id) item.quantity += 1
    })

    return ({ type: 'ADD_TO_CART', payload: newData })
}


export const removeFromCart = (data, _id, title, type) =>
{
    // console.log("🚀 ~ file: Actions.js ~ line 42 ~ data", data)
    // console.log("🚀 ~ file: Actions.js ~ line 42 ~ _id", _id)
    // console.log("🚀 ~ file: Actions.js ~ line 42 ~ type", type)
    const newData = data.filter((x) => x._id !== _id)
    successMsg(`${title} is removed from cart`)
    localStorage.setItem('__nextStore__cart__00_L', JSON.stringify(newData))
    return ({ type, payload: newData })
}

export const deleteItem = (data, id, type) =>
{
    const newData = data.filter(item => item._id !== id)
    return ({ type, payload: newData })
}

export const updateItem = (data, id, post, type) =>
{
    const newData = data.map(item => (item._id === id ? post : item))
    return ({ type, payload: newData })
}