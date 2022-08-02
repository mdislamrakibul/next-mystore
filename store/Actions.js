import { successMsg } from '../helpers/Toastify';
export const ACTIONS = {
    NOTIFY: 'NOTIFY',
    AUTH: 'AUTH',
    ADD_TO_CART: 'ADD_TO_CART',
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