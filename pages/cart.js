import baseUrl from '../helpers/baseUrl';

function Cart({ error, errorMsg })
{
    if (error) {

        M.toast({ html: errorMsg, classes: "blue" })
    }
    return (
        <div> Cart</div>
    )
}

export async function getServerSideProps(context)
{
    const res = await fetch(`${baseUrl}/api/ops/cart`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${context?.req?.cookies?.token}`
        }
    })
    const cart = await res.json()

    return {
        props: {
            user: JSON.parse(context?.req?.cookies?.user),
            cart: cart ? cart : {},
            errorMsg: cart.status === false ? cart.message : '',
            error: cart.status ? false : true
        }
    }
}


export default Cart