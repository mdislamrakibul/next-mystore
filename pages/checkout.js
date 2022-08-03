import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React, { useContext, useEffect, useState } from 'react';
import { errorMsg } from '../helpers/Toastify';
import { DataContext } from '../store/GlobalState';

function Checkout()
{
    const router = useRouter()
    const { state, dispatch } = useContext(DataContext)
    const { cart } = state
    const [total, setTotal] = useState(0)
    let cartLocal = []
    const [promoCode, setPromoCode] = useState('')
    const [countPromoCode, setCountPromoCode] = useState(0)
    const { user } = parseCookies()
    useEffect(() =>
    {
        cartLocal = cart && cart.length ? cart :
            (localStorage.getItem('__nextStore__cart__00_L') ? JSON.parse(localStorage.getItem('__nextStore__cart__00_L')) : [])

        if (!cartLocal.length) {
            errorMsg('You have no items in your cart')
            router.push('/')
        }

        let sum = cartLocal.reduce(function (previousValue, currentValue)
        {
            return previousValue + (currentValue.price * currentValue.quantity);
        }, 0);

        setTotal(sum)
    }, [])


    const [chkValue, setChkValue] = useState('cod')

    const handleCHange = (e) =>
    {
        setChkValue(e.target.value)
    }

    const handleRedeem = () =>
    {
        if (promoCode !== 'X7e9D43') {
            errorMsg('Invalid Promo Code')
            return
        }
        if (countPromoCode === 0) {
            setCountPromoCode(1)
            setTotal(promoCode === 'X7e9D43' ? total - 10 : total)
        }
        if (countPromoCode === 1) {
            console.log("countPromoCode", countPromoCode);
            errorMsg('You can redeem only once')
            return
        }
    }
    return (
        <div >
            <div class="container" >
                <main>
                    <div class="row g-5">


                        <div class="col-md-5 col-lg-4 order-md-last" >
                            <h4 class="d-flex justify-content-between align-items-center mb-3">
                                <span class="text-secondary">Cart Summary <i class="fas fa-luggage-cart"></i></span>
                                <span class="badge bg-success rounded-pill">{cart.length}</span>
                            </h4>
                            <ul class="list-group mb-3">
                                {cart.map(item => (
                                    <li class="list-group-item d-flex justify-content-between lh-sm">
                                        <div className='justify-content-between'>
                                            <img src={item.image} alt={item.title}
                                                className="img-thumbnail"
                                                style={{ minWidth: '30px', height: '30px' }} />&nbsp;&nbsp;
                                            <h6 class="my-0">{item.title}</h6>
                                        </div>
                                        <span class="text-muted">${item.price * item.quantity}</span>
                                    </li>
                                ))}

                                {(promoCode === 'X7e9D43' && countPromoCode === 1) &&
                                    <li class="list-group-item d-flex justify-content-between bg-light">
                                        <div class="text-success">
                                            <h6 class="my-0">Promo code</h6>
                                            <small>X7e9D43</small>
                                        </div>
                                        <span class="text-success">−$10</span>
                                    </li>
                                }

                                <li class="list-group-item d-flex justify-content-between">
                                    <span>Total (USD)</span>
                                    <strong>${total}</strong>
                                </li>
                            </ul>

                            <div class="card p-2">
                                <span className='text-center' style={{ color: 'blueviolet' }}>
                                    'X7e9D43' Promo Code is valid for 10$ discount.
                                </span>
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Promo code" onChange={(e) => setPromoCode(e.target.value)} disabled={countPromoCode === 1} />
                                    <button type="submit" class="btn btn-secondary" onClick={() => handleRedeem()} disabled={countPromoCode === 1}>Redeem</button>
                                </div>

                            </div>
                        </div>


                        <div class="col-md-7 col-lg-8" style={{ backgroundColor: 'rgb(248, 249, 250)', padding: '20px', borderRadius: '10px' }}>
                            <h4 class="mb-3">Payment</h4>

                            <div class="my-3">
                                <div class="form-check">
                                    <input id="cod" type="radio" class="form-check-input"
                                        onChange={handleCHange} value='cod' checked={chkValue === 'cod'} />
                                    <label class="form-check-label" for="cod">Cash on delivery (COD)</label>
                                </div>
                                <div class="form-check">
                                    <input id="op" type="radio" class="form-check-input"
                                        onChange={handleCHange} value='op' checked={chkValue === 'op'} />
                                    <label class="form-check-label" for="op">Online Payment</label>
                                </div>
                            </div>
                            <hr />
                            {chkValue === 'cod' &&
                                <>
                                    <h4 class="mb-3">Billing address</h4>
                                    <form class="needs-validation" novalidate>
                                        <div class="row g-3">
                                            <div class="col-sm-6">
                                                <label for="firstName" class="form-label">First name</label>
                                                <input type="text" class="form-control" id="firstName" placeholder="Mr. John" required />
                                                <div class="invalid-feedback">
                                                    Valid first name is required.
                                                </div>
                                            </div>

                                            <div class="col-sm-6">
                                                <label for="lastName" class="form-label">Last name</label>
                                                <input type="text" class="form-control" id="lastName" placeholder="Doe" required />
                                                <div class="invalid-feedback">
                                                    Valid last name is required.
                                                </div>
                                            </div>

                                            <div class="col-sm-6">
                                                <label for="email" class="form-label">Email <span class="text-muted"></span></label>
                                                <input type="email" class="form-control" id="email" placeholder="you@example.com" />
                                                <div class="invalid-feedback">
                                                    Please enter a valid email address for shipping updates.
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <label for="mobile" class="form-label">Mobile <span class="text-muted"></span></label>
                                                <input type="number" class="form-control" id="mobile" placeholder="88018000000" required />
                                                <div class="invalid-feedback">
                                                    Please enter a valid email address for shipping updates.
                                                </div>
                                            </div>

                                            <div class="col-12">
                                                <label for="address" class="form-label">Address</label>
                                                <input type="text" class="form-control" id="address" placeholder="1234 Main St" required />
                                                <div class="invalid-feedback">
                                                    Please enter your shipping address.
                                                </div>
                                            </div>
                                        </div>

                                        <hr />

                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input" id="same-address" />
                                            <label class="form-check-label" for="same-address">Shipping address is the same as my billing address</label>
                                        </div>

                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input" id="save-info" />
                                            <label class="form-check-label" for="save-info">Save this information for next time</label>
                                        </div>

                                        <hr />
                                        {user
                                            ?
                                            <div class="btn-group" role="group" aria-label="Basic example">
                                                <button class="btn btn-success btn-sm" type="submit">
                                                    <i class="far fa-check-circle"></i>&nbsp; Proceed
                                                </button>
                                                <button class="btn btn-danger btn-sm" onClick={() =>
                                                {
                                                    router.push("/cart")
                                                }}>
                                                    <i class="far fa-times-circle"></i>&nbsp; Cancel
                                                </button>
                                            </div>
                                            :
                                            <button class="btn btn-info btn-sm w-100" onClick={() =>
                                            {
                                                router.push("/login")
                                            }}>
                                                <i class="fas fa-sign-in-alt"></i>&nbsp; Login
                                            </button>
                                        }


                                    </form>
                                </>
                            }


                            {chkValue === 'op'
                                &&
                                <div class="row gy-3">
                                    <div class="col-md-6">
                                        <label for="cc-name" class="form-label">Name on card</label>
                                        <input type="text" class="form-control" id="cc-name" placeholder="" required />
                                        <small class="text-muted">Full name as displayed on card</small>
                                        <div class="invalid-feedback">
                                            Name on card is required
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <label for="cc-number" class="form-label">Credit card number</label>
                                        <input type="text" class="form-control" id="cc-number" placeholder="" required />
                                        <div class="invalid-feedback">
                                            Credit card number is required
                                        </div>
                                    </div>

                                    <div class="col-md-3">
                                        <label for="cc-expiration" class="form-label">Expiration</label>
                                        <input type="text" class="form-control" id="cc-expiration" placeholder="" required />
                                        <div class="invalid-feedback">
                                            Expiration date required
                                        </div>
                                    </div>

                                    <div class="col-md-3">
                                        <label for="cc-cvv" class="form-label">CVV</label>
                                        <input type="text" class="form-control" id="cc-cvv" placeholder="" required />
                                        <div class="invalid-feedback">
                                            Security code required
                                        </div>
                                    </div>
                                </div>
                            }







                        </div>


                    </div>
                </main>
            </div>
        </div>

    )
}



// export async function getServerSideProps(ctx)
// {
//     const { token } = parseCookies(ctx)
//     const cartLocal = localStorage.getItem('__nextStore__cart__00_L') ? JSON.parse(localStorage.getItem('__nextStore__cart__00_L')) : []
//     if (cartLocal) {
//         const { res } = ctx
//         res.writeHead(302, { Location: "/" })
//         res.end()
//     }
//     return {
//         props: { orders: [] }
//     }
// }


export default Checkout