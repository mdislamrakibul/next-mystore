export const ACTIONS = {
    NOTIFY: 'NOTIFY',
    AUTH: 'AUTH',
    ADD_TO_CART: 'ADD_TO_CART',
}


export const addToCart = (product, cart) =>
{

    M.toast({ html: `${product.title} added to cart.`, classes: "green" })
    return ({
        type: 'ADD_TO_CART',
        payload: [...cart, { ...product, quantity: 1 }]
    })

    // console.log("🚀 ~ file: Actions.js ~ line 22 ~ check", check)
    // if (!check || check === 0) {
    //     M.toast({ html: `${product.title} added to cart.`, classes: "green" })
    // } else {

    //     M.toast({ html: `${product.title} already exists.`, classes: "red" })
    //     return ({ type: 'ADD_TO_CART', payload: cart })
    // }

}