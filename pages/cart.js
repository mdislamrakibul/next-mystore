import Head from 'next/head';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { useContext, useEffect, useState } from 'react';
import CartItem from '../components/CartItem';
import { getData } from '../helpers/dataOps';
import { DataContext } from '../store/GlobalState';
const Cart = () => {
    const { user } = parseCookies()
    let cartLocal = []
    const { state, dispatch } = useContext(DataContext)
    const { cart } = state
    const [address, setAddress] = useState('')
    const [mobile, setMobile] = useState('')
    const [total, setTotal] = useState(0)
    useEffect(() => {
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
            const updateCart = async () => {
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


    useEffect(() => {
        const getTotal = () => {
            const res = cart.reduce((prev, item) => {
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

                    <div className='col-md-6 offset-md-3 text-center'>
                        <img className='img-fluid' style={{ width: '600px' }} src="/empty_cart.png" alt="not empty" />
                        <br />
                        <h5 className='text-uppercase'>Your cart is empty</h5>
                        <Link href='/' ><a style={{ textDecoration: 'none', color: 'cadetblue' }}>continue shopping</a></Link>
                    </div>
                </div>

            </div>
        )
    const handlePayment = () => {
        console.log("go to payment");
    }
    return (
        <div className="container" >
            <Head>
                <title>Cart</title>
            </Head>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='justify-content-between'>
                        <h5 className='text-uppercase'>Your Cart</h5>
                        {/* <div className='justify-content-between'>
                            <button className='btn btn-sm btn-info'>
                                <Link href="/"><a style={{ textDecoration: 'none', color: 'white' }}><i className="fas fa-arrow-alt-circle-left"></i>&nbsp;Continue Shopping</a></Link>
                            </button>&nbsp;
                            <button className='btn btn-sm btn-primary'>
                                <Link href="/checkout"><a style={{ textDecoration: 'none', color: 'white' }}><i className="fas fa-shopping-bag"></i>&nbsp;Checkout</a></Link>

                            </button>
                        </div> */}
                    </div>
                    <hr />
                    <div className='table-responsive'>
                        <table className="table table-hover">
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
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button className='btn btn-sm btn-info'>
                                <Link href="/"><a style={{ textDecoration: 'none', color: 'white' }}><i className="fas fa-arrow-alt-circle-left"></i>&nbsp;Continue Shopping</a></Link>
                            </button>
                            <button className='btn btn-sm btn-primary'>
                                <Link href="/checkout"><a style={{ textDecoration: 'none', color: 'white' }}><i className="fas fa-shopping-bag"></i>&nbsp;Checkout</a></Link>

                            </button>
                        </div>
                        <div className='text-end'>
                            <span>Subtotal&nbsp;&nbsp;: <b style={{ paddingLeft: '50px' }}>$ {total}</b></span><br />
                            <span>Shipping&nbsp; &nbsp;: <b style={{ paddingLeft: '50px' }}>Free</b></span><br />
                            <span>Total&nbsp; &nbsp;: <b style={{ paddingLeft: '50px' }}>$ {total}</b></span><br />
                        </div>
                    </div>

                    <hr />
                </div>
                {/* <div className='col-md-4'>
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
                                <div className="mb-3 row">
                                    <label htmlFor="address" className="col-sm-1 col-form-label">
                                        <i className="fas fa-map-marked-alt"></i>
                                    </label>
                                    <div className="col-sm-11">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="address" name="address"
                                                onChange={e => setAddress(e.target.value)} value={address} placeholder="Address" />
                                            <label htmlFor="address" className="form-label">Address</label>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="mb-3 row">
                                    <label htmlFor="mobile" className="col-sm-1 col-form-label">
                                        <i className="fas fa-mobile-alt"></i>
                                    </label>
                                    <div className="col-sm-11">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" id="mobile" name="mobile"
                                                onChange={e => setMobile(e.target.value)} value={mobile} placeholder="Mobile" />
                                            <label htmlFor="mobile" className="form-label">Mobile</label>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className='justify-content-between'>
                                <h6>Total: <span className="">${total}</span></h6>
                                {
                                    user
                                        ?
                                        <a className="btn btn-sm btn-info justify-content-between" onClick={(e) => handlePayment(e)}>
                                            <i className='material-icons'>payment</i>&nbsp;Checkout
                                        </a>
                                        :
                                        <Link href='/login' >
                                            <a className="btn btn-sm btn-primary" >
                                                <i className="fas fa-sign-in-alt">&nbsp;</i>
                                                Proceed to Checkout
                                            </a>
                                        </Link>
                                }

                            </div>
                        </form>
                    </div>
                </div> */}
            </div >
        </div >
    )
}

export default Cart