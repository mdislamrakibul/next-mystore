import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React, { useContext, useEffect, useState } from 'react';
import { postData } from '../helpers/dataOps';
import { errorMsg, successMsg } from '../helpers/Toastify';
import { DataContext } from '../store/GlobalState';
import StripeCheckout from "react-stripe-checkout";

function Checkout() {
	const router = useRouter()
	const { state, dispatch } = useContext(DataContext)
	const { cart } = state
	const [total, setTotal] = useState(0)
	let cartLocal = []
	const [promoCode, setPromoCode] = useState('')
	const [countPromoCode, setCountPromoCode] = useState(0)
	const { user, token } = parseCookies()

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [address, setAddress] = useState('')

	const [firstNameError, setFirstNameError] = useState(false)
	const [lastNameError, setLastNameError] = useState(false)
	const [emailError, setEmailError] = useState(false)
	const [phoneError, setPhoneError] = useState(false)
	const [addressError, setAddressError] = useState(false)
	useEffect(() => {
		cartLocal = cart && cart.length ? cart :
			(localStorage.getItem('__nextStore__cart__00_L') ? JSON.parse(localStorage.getItem('__nextStore__cart__00_L')) : [])

		if (!cartLocal.length) {
			errorMsg('You have no items in your cart')
			router.push('/')
		}

		let sum = cartLocal.reduce(function (previousValue, currentValue) {
			return previousValue + (currentValue.price * currentValue.quantity);
		}, 0);

		setTotal(sum)
		setFirstNameError(false)
		setLastNameError(false)
		setEmailError(false)
		setPhoneError(false)
		setAddressError(false)
	}, [])


	const [chkValue, setChkValue] = useState('cod')

	const handleCHange = (e) => {
		setChkValue(e.target.value)
	}

	const handleRedeem = () => {
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

	const handleRefresh = (e) => {
		e.preventDefault()
		setFirstNameError(false)
		setLastNameError(false)
		setEmailError(false)
		setPhoneError(false)
		setAddressError(false)
		setFirstName('')
		setLastName('')
		setEmail('')
		setPhone('')
		setAddress('')
	}
	const handleProceed = async (e) => {
		e.preventDefault();

		setFirstNameError(false)
		setLastNameError(false)
		setEmailError(false)
		setPhoneError(false)
		setAddressError(false)
		if (firstName === '') {
			setFirstNameError(true)
			return
		}
		if (lastName === '') {
			setLastNameError(true)
			return
		}
		if (email === '') {
			setEmailError(true)
			return
		}
		if (phone === '') {
			setPhoneError(true)
			return
		}
		if (address === '') {
			setAddressError(true)
			return
		}
		const params = {
			firstName,
			lastName,
			email,
			phone,
			address,
			total,
			cart: cart,
			promoCodeRedeem: promoCode === 'X7e9D43' ? true : false,
			amountRedeem: promoCode === 'X7e9D43' ? 10 : 0,
			method: chkValue,
		}
		const response = await postData('order', params, token)
		if (!response.status) {
			errorMsg(response?.message)
			return
		}
		successMsg(response.message)
		localStorage.removeItem('__nextStore__cart__00_L')
		dispatch({ type: 'ADD_TO_CART', payload: [] })
		setFirstName('')
		setLastName('')
		setEmail('')
		setPhone('')
		setAddress('')
		setTotal(0)
		setCountPromoCode(0)
		router.push('/')
	}


	const handleStripeCeckout = async (paymentInfo) => {
		console.log(paymentInfo)
		postData('payment', {
			paymentInfo: paymentInfo,
			cart: cart
		}, token)
			.then(res => {
				if (!res.status) {
					errorMsg(res.message)
					return
				}
				successMsg(res.message)
				localStorage.removeItem('__nextStore__cart__00_L')
				dispatch({ type: 'ADD_TO_CART', payload: [] })
				router.push('/')
			})
	}

	return (
		<div >
			<div className="container" >
				<main>
					<div className="row g-5">


						<div className="col-md-5 col-lg-4 order-md-last" >
							<h4 className="d-flex justify-content-between align-items-center mb-3">
								<span className="text-secondary">Cart Summary <i className="fas fa-luggage-cart"></i></span>
								<span className="badge bg-success rounded-pill">{cart.length}</span>
							</h4>
							<ul className="list-group mb-3">
								{cart.map(item => (
									<li className="list-group-item d-flex justify-content-between lh-sm" key={item._id}>
										<div className='justify-content-between'>
											<img src={item.image} alt={item.title}
												className="img-thumbnail"
												style={{ minWidth: '30px', height: '30px' }} />&nbsp;&nbsp;
											<h6 className="my-0">{item.title}</h6>
										</div>
										<span className="text-muted">${item.price * item.quantity}</span>
									</li>
								))}

								{(promoCode === 'X7e9D43' && countPromoCode === 1) &&
									<li className="list-group-item d-flex justify-content-between bg-light">
										<div className="text-success">
											<h6 className="my-0">Promo code</h6>
											<small>X7e9D43</small>
										</div>
										<span className="text-success">−$10</span>
									</li>
								}

								<li className="list-group-item d-flex justify-content-between">
									<span>Total (USD)</span>
									<strong>${total}</strong>
								</li>
							</ul>

							<div className="card p-2">
								<span className='text-center' style={{ color: 'blueviolet' }}>
									'X7e9D43' Promo Code is valid for 10$ discount.
								</span>
								<div className="input-group">
									<input type="text" className="form-control" placeholder="Promo code" onChange={(e) => setPromoCode(e.target.value)} disabled={countPromoCode === 1} />
									<button type="submit" className="btn btn-secondary" onClick={() => handleRedeem()} disabled={countPromoCode === 1}>Redeem</button>
								</div>

							</div>
						</div>


						<div className="col-md-7 col-lg-8" style={{ backgroundColor: 'rgb(248, 249, 250)', padding: '20px', borderRadius: '10px' }}>
							<h4 className="mb-3">Payment</h4>

							<div className="my-3">
								<div className="form-check">
									<input id="cod" type="radio" className="form-check-input"
										onChange={handleCHange} value='cod' checked={chkValue === 'cod'} />
									<label className="form-check-label" htmlFor="cod">Cash on delivery (COD)</label>
								</div>
								<div className="form-check">
									<input id="op" type="radio" className="form-check-input"
										onChange={handleCHange} value='op' checked={chkValue === 'op'} />
									<label className="form-check-label" htmlFor="op">Online Payment (Card)</label>
								</div>
							</div>
							<hr />
							{chkValue === 'cod' &&
								<>
									{user
										?
										<>
											<h4 className="mb-3">Billing address</h4>
											<form>
												<div className="row g-3">
													<div className="col-sm-6">
														<label htmlFor="firstName" className="form-label">First name</label>
														<input type="text" className="form-control" id="firstName" placeholder="Mr. John"
															value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
														<div style={{ color: 'red' }} className={firstNameError ? 'd-block' : 'd-none'}>
															<i className="fas fa-exclamation-triangle"></i>&nbsp;Valid first name is required.
														</div>
													</div>

													<div className="col-sm-6">
														<label htmlFor="lastName" className="form-label">Last name</label>
														<input type="text" className="form-control" id="lastName" placeholder="Doe"
															value={lastName} onChange={(e) => setLastName(e.target.value)}
															required />
														<div style={{ color: 'red' }} className={lastNameError ? 'd-block' : 'd-none'}>
															<i className="fas fa-exclamation-triangle"></i>&nbsp; Valid last name is required.
														</div>
													</div>

													<div className="col-sm-6">
														<label htmlFor="email" className="form-label">Email <span className="text-muted"></span></label>
														<input type="email" className="form-control" id="email" placeholder="you@example.com"
															value={email} onChange={(e) => setEmail(e.target.value)} />
														<div style={{ color: 'red' }} className={emailError ? 'd-block' : 'd-none'}>
															<i className="fas fa-exclamation-triangle"></i>&nbsp; Please enter a valid email for shipping updates.
														</div>
													</div>
													<div className="col-sm-6">
														<label htmlFor="phone" className="form-label">Phone No. <span className="text-muted"></span></label>
														<input type="text" className="form-control" id="phone" placeholder="88018000000" required
															value={phone} onChange={(e) => setPhone(e.target.value)} />
														<div style={{ color: 'red' }} className={phoneError ? 'd-block' : 'd-none'}>
															<i className="fas fa-exclamation-triangle"></i>&nbsp; Please enter a valid Phone No.
														</div>
													</div>

													<div className="col-12">
														<label htmlFor="address" className="form-label">Address</label>
														<input type="text" className="form-control" id="address" placeholder="1234 Main St" required
															value={address} onChange={(e) => setAddress(e.target.value)} />
														<div style={{ color: 'red' }} className={addressError ? 'd-block' : 'd-none'}>
															<i className="fas fa-exclamation-triangle"></i>&nbsp; Please enter your shipping address.
														</div>
													</div>
												</div>

												<hr />

												<div className="form-check">
													<input type="checkbox" className="form-check-input" id="same-address" />
													<label className="form-check-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
												</div>

												<div className="form-check">
													<input type="checkbox" className="form-check-input" id="save-info" />
													<label className="form-check-label" htmlFor="save-info">Save this information for next time</label>
												</div>

												<hr />
												<div className="btn-group" role="group" aria-label="Basic example">
													<button className="btn btn-success btn-sm" onClick={(e) => handleProceed(e)}>
														<i className="far fa-check-circle"></i>&nbsp; Proceed
													</button>
													<button className="btn btn-primary btn-sm" onClick={(e) => handleRefresh(e)}>
														<i className="fas fa-redo"></i>&nbsp; Refresh
													</button>
													<button className="btn btn-danger btn-sm" onClick={() => {
														router.push("/cart")
													}}>
														<i className="far fa-times-circle"></i>&nbsp; Cancel
													</button>
												</div>
											</form>
										</>
										:
										<div class="alert alert-secondary text-center" role="alert">
											<h5>To make online payment you need to login first</h5>
											<button className="btn btn-info btn-smp" onClick={() => {
												router.push("/login")
											}}>
												<i className="fas fa-sign-in-alt"></i>&nbsp; Login
											</button>
										</div>
									}
								</>
							}

							{chkValue === 'op' &&
								<div>
									{user
										?
										<StripeCheckout
											stripeKey="pk_test_51IIsAbGmZm2y53ypb2h6tEtmxaQ6inGxNUWZ4eVGE5sC74Pd5Vp28tbcwgPk9wxO3ss7hY2QuhtezhnRQev3X22Y00ZZiECEoT"
											image="https://res.cloudinary.com/x-gwkjs-8zn7m-3/image/upload/v1660992466/cld-sample-4.jpg"
											token={(paymentInfo) => handleStripeCeckout(paymentInfo)}
											// amount={product.price * 100}
											name="My Store"
											currency="USD"
											amount={total * 100}
											billingAddress={true}
											shippingAddress={true}
										>
											<button className="btn btn-primary btn-small">Pay with Stripe</button>
										</StripeCheckout>
										:
										<div class="alert alert-secondary text-center" role="alert">
											<h5>To make online payment you need to login first</h5>
											<button className="btn btn-info btn-smp" onClick={() => {
												router.push("/login")
											}}>
												<i className="fas fa-sign-in-alt"></i>&nbsp; Login
											</button>
										</div>
									}
								</div>
							}
						</div>
					</div>
				</main>
			</div >
		</div >

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