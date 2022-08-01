import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useContext, useEffect, useState } from 'react';
import CartItem from '../components/CartItem';
import { getData } from '../helpers/dataOps';
import { DataContext } from '../store/GlobalState';
const Cart = () =>
{
    const { token, user, __nextStore__cart__00 } = parseCookies()
    const router = useRouter()
    let price = 0
    let cartLocal = []
    const { state, dispatch } = useContext(DataContext)
    const { cart } = state
    const [address, setAddress] = useState('')
    const [mobile, setMobile] = useState('')
    const [total, setTotal] = useState(0)
    useEffect(() =>
    {
        cartLocal = localStorage.getItem('__nextStore__cart__00_L') ? JSON.parse(localStorage.getItem('__nextStore__cart__00_L')) : []
        // cartLocal = Cookies.get('__nextStore__cart__00_C') ? JSON.parse(Cookies.get('__nextStore__cart__00_C')) : []
        // console.log("cartLocal", cartLocal.length)
        // if (!cart.length && cartLocal.length) {
        //     dispatch({ type: 'ADD_TO_CART', payload: cartLocal })
        // } else {
        //     dispatch({ type: 'ADD_TO_CART', payload: cart })
        // }
        if (cartLocal && cartLocal.length > 0) {
            let newArr = []
            const updateCart = async () =>
            {
                for (const item of cartLocal) {
                    const res = await getData(`products/${item._id}`)
                    const { _id, title, images, price, inStock, sold, image } = res.data
                    if (inStock > 0) {
                        newArr.push({
                            _id, title, images, price, inStock, sold, image,
                            quantity: item.quantity > inStock ? 1 : item.quantity
                        })
                    }
                }

                dispatch({ type: 'ADD_TO_CART', payload: newArr })
            }

            updateCart()
        }
    }, [])


    useEffect(() =>
    {
        const getTotal = () =>
        {
            const res = cart.reduce((prev, item) =>
            {
                return prev + (item.price * item.quantity)
            }, 0)

            setTotal(res)
        }

        getTotal()
    }, [cart])


    if (!cart.length || cartLocal.length)
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
    const handlePayment = () =>
    {
        console.log("go to payment");
    }
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
                                <th>Remove</th>
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
                    <div style={{
                        border: '0.5px solid gray',
                        borderRadius: '10px',
                        padding: '15px'
                    }}>
                        <h6 style={{ fontWeight: 'bold' }}>Shipping</h6>
                        <hr />
                        <form>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">bookmark</i>
                                    <input type="text" name="address" id="address"
                                        className="form-control mb-2" value={address}
                                        onChange={e => setAddress(e.target.value)} />
                                    <label htmlFor="address">Address</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">local_phone</i>
                                    <input type="text" name="mobile" id="mobile"
                                        className="form-control mb-2" value={mobile}
                                        onChange={e => setMobile(e.target.value)} />
                                    <label htmlFor="mobile">Mobile</label>
                                </div>
                            </div>

                            <div className='justify-content-between'>
                                <h6>Total: <span className="">${total}</span></h6>
                                {
                                    user
                                        ?
                                        <a className="btn btn-dark my-2 #2196f3 blue justify-content-between" onClick={(e) => handlePayment(e)}>
                                            <i className='material-icons'>payment</i>&nbsp;Checkout</a>
                                        :
                                        <Link href='/login' >
                                            <a className="btn btn-dark my-2 #2196f3 blue justify-content-between" >
                                                Login</a>
                                        </Link>
                                }

                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >

    )
}



export default Cart