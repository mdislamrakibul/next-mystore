import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useContext, useEffect } from 'react';
import CartItem from '../components/CartItem';
import { DataContext } from '../store/GlobalState';

const Cart = () =>
{
    const { token, user, __nextStore__cart__00 } = parseCookies()
    const router = useRouter()
    let price = 0

    const { state, dispatch } = useContext(DataContext)
    const { cart } = state

    useEffect(() =>
    {
        if (cart.length < 0 && __nextStore__cart__00.length) {
            dispatch({ type: 'ADD_TO_CART', payload: __nextStore__cart__00 })
        } else {
            dispatch({ type: 'ADD_TO_CART', payload: cart })
        }
        console.log(cart);
    }, [])


    if (cart.length === 0 || __nextStore__cart__00.length === 0)
        return (
            <div className='container'>
                <div className='row'>

                    <div className='col s3'></div>
                    <div className='col s6 text-center'>
                        <img style={{ width: '600px' }} src="/empty_cart.png" alt="not empty" />
                        <br />
                        <h5 className='text-uppercase'>Your cart is empty</h5>
                        <Link href='/' ><a>continue shopping</a></Link>
                    </div>
                    <div className='col s3'></div>
                </div>

            </div>
        )


    return (
        <div className="container" >
            <Head>
                <title>Cart</title>
            </Head>
            <div className='row'>
                <div className='col s8'>
                    <h5 className='text-uppercase'>Your Shopping Cart</h5>
                    <hr />
                    <table className="table my-3 highlight">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Title</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => (

                                <CartItem key={item._id} dispatch={dispatch} item={item} cart={cart} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='col s4'>
                    <h5 className='text-uppercase'>Checkout</h5>
                    <hr />
                </div>
            </div>
        </div>

    )
}



export default Cart