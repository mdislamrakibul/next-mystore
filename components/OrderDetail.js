import { parseCookies } from 'nookies';
import { patchData } from '../helpers/dataOps';
import { updateItem } from '../store/Actions';
// import PaypalBtn from './paypalBtn';
import moment from 'moment';
import { useState } from 'react';
import { errorMsg, successMsg } from '../helpers/Toastify';
import Loading from './Loading';
import Cookies from 'js-cookie';
import router from 'next/router';
const OrderDetail = ({ orderDetail, state, dispatch }) => {
    console.log(orderDetail);
    const { auth, orders } = state
    const { token } = parseCookies()
    const user = Cookies.get('user') && JSON.parse(Cookies.get('user'))
    const [isLoading, setIsLoading] = useState(false)
    const handleDelivered = (order) => {
        setIsLoading(true)
        patchData(`order/delivered/${order?._id}`, {}, token)
            .then(res => {
                setIsLoading(false)
                if (!res.status) {
                    errorMsg(res.message)
                    return
                }
                const { paid, dateOfPayment, method, delivered } = res.data

                dispatch(updateItem(orders, order?._id, {
                    ...order, paid, dateOfPayment, method, delivered
                }, 'GET_ORDERS'))

                successMsg(res.message)
            })
    }

    if (!user) return null;
    return (
        <>
            {isLoading && <Loading />}
            {orderDetail.map(order => (
                <div key={order?._id} style={{ margin: '20px auto', position: 'relative', fontWeight: 'bold' }} className="row justify-content-around">
                    {order?.delivered && order?.paid &&
                        <img src='https://res.cloudinary.com/x-gwkjs-8zn7m-3/image/upload/v1661763694/delivered-stamp-delivered-rubber-stamp-illustration-isolated-white-background-124829036-removebg-preview_nnelrh.png'
                            style={{
                                position: 'absolute',
                                margin: 'auto',
                                left: '0',
                                right: '0',
                                top: '0',
                                bottom: '0',
                                textAlign: 'center',
                                zIndex: '-999',
                                opacity: '.2',
                                width: '45%'
                            }} />}
                    {order?.paid && !order?.delivered &&
                        <img src='https://res.cloudinary.com/x-gwkjs-8zn7m-3/image/upload/v1661764967/images-removebg-preview_vvbisl.png'
                            style={{
                                position: 'absolute',
                                margin: 'auto',
                                left: '0',
                                right: '0',
                                top: '0',
                                bottom: '0',
                                textAlign: 'center',
                                zIndex: '-999',
                                opacity: '.2',
                                width: '45%'
                            }} />}
                    {!order?.paid && !order?.delivered && !order?.rejectedIs &&
                        <img src='https://res.cloudinary.com/x-gwkjs-8zn7m-3/image/upload/v1661766343/depositphotos_34813181-stock-photo-in-progress-grunge-red-round-removebg-preview_nopk3d.png'
                            style={{
                                position: 'absolute',
                                margin: 'auto',
                                left: '0',
                                right: '0',
                                top: '0',
                                bottom: '0',
                                textAlign: 'center',
                                zIndex: '-999',
                                opacity: '.2',
                                width: '45%'
                            }} />}
                    {order?.rejectedIs &&
                        <img src='https://res.cloudinary.com/x-gwkjs-8zn7m-3/image/upload/v1661766788/reject_chofzx.png'
                            style={{
                                position: 'absolute',
                                margin: 'auto',
                                left: '0',
                                right: '0',
                                top: '0',
                                bottom: '0',
                                textAlign: 'center',
                                zIndex: '-999',
                                opacity: '.2',
                                width: '45%'
                            }} />}

                    <div className="my-3">
                        <div className="alert alert-secondary justify-content-between">
                            <div className='d-flex' style={{ gap: '10px' }}>
                                <button className="btn btn-sm btn-danger" onClick={() => router.back()}>
                                    <i className="fas fa-long-arrow-alt-left" aria-hidden="true"></i>
                                </button>

                                <h4 className="text-break">Order Details</h4>
                            </div>
                            <div className="justify-content-between">
                                {
                                    order?.delivered
                                        ?
                                        <span style={{ color: 'green' }}>[Delivered on {moment(order?.updatedAt).format('MMMM Do YYYY, h:mm:ss')}]&nbsp;</span>
                                        : <span style={{ color: 'red' }}>[Not Delivered]&nbsp;</span>
                                }
                                {
                                    user && user.role === 'root' && !order?.delivered && !order?.rejectedIs &&
                                    <button className="btn btn-sm btn-success text-uppercase"
                                        onClick={() => handleDelivered(order)}>
                                        <i className="fas fa-truck"></i>&nbsp; &nbsp; Mark as delivered
                                    </button>
                                }

                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col-md-12'>
                                <div className="alert alert-primary" style={{ opacity: '.5' }}>
                                    <h6 className="text-break">Order##{order?._id}</h6>
                                </div>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td >Method</td>
                                                        <td>&nbsp; &nbsp;: &nbsp; &nbsp; {order?.method === 'cod' ? 'Cash On Delivery' : order?.method}</td>
                                                    </tr>
                                                    <tr>
                                                        <td >Payment Id</td>
                                                        <td>&nbsp; &nbsp;: &nbsp; &nbsp; {order?.paymentId}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Paid</td>
                                                        <td>&nbsp; &nbsp;: &nbsp; &nbsp; {order?.paid ? <i className="fas fa-check-circle text-success"></i>
                                                            : <i className="fas fa-times-circle text-danger"></i>}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>


                                        <div className='col-md-6'>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td  >PromoCode Redeem</td>
                                                        <td>&nbsp; &nbsp;: &nbsp; &nbsp; {order?.promoCodeRedeem ? <i className="fas fa-check-circle text-success"></i>
                                                            : <i className="fas fa-times-circle text-danger"></i>}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Amount Redeem</td>
                                                        <td>&nbsp; &nbsp;: &nbsp; &nbsp; $ {order?.amountRedeem}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Delivered</td>
                                                        <td>&nbsp; &nbsp;: &nbsp; &nbsp; {order?.delivered
                                                            ? <i className="fas fa-check-circle text-success"></i>
                                                            : <i className="fas fa-times-circle text-danger"></i>}</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col-md-6'>
                                <div className="alert alert-primary" style={{ opacity: '.5' }}>
                                    <h6 className="text-break">User Information</h6>
                                </div>
                                <div className='container'>
                                    <table>
                                        <tbody>
                                            <tr >
                                                <td   >FirstName</td>
                                                <td>&nbsp; &nbsp;: &nbsp;&nbsp;{order?.user.firstName}</td>
                                            </tr>
                                            <tr>
                                                <td   >LastName</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{order?.user.lastName}</td>
                                            </tr>
                                            <tr>
                                                <td   >Username</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{order?.user.username}</td>
                                            </tr>
                                            <tr>
                                                <td   >Email</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{order?.user.email}</td>
                                            </tr>
                                            <tr>
                                                <td   >Phone</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{order?.user.phone}</td>
                                            </tr>
                                            <tr>
                                                <td   >Address</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{order?.user.address}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="alert alert-primary" style={{ opacity: '.5' }}>
                                    <h6 className="text-break">Buyer Information</h6>
                                </div>
                                <div className='container'>
                                    <table>
                                        <tbody>
                                            <tr >
                                                <td   >FirstName</td>
                                                <td>&nbsp; &nbsp;: &nbsp;&nbsp;{order?.firstName}</td>
                                            </tr>
                                            <tr>
                                                <td   >LastName</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{order?.lastName}</td>
                                            </tr>
                                            <tr>
                                                <td   >Email</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{order?.email}</td>
                                            </tr>
                                            <tr>
                                                <td   >Phone</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{order?.phone}</td>
                                            </tr>
                                            <tr>
                                                <td   >Address</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{order?.address}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className="alert alert-primary" style={{ opacity: '.5' }}>
                                <h6 className="text-break">Products</h6>
                            </div>
                            <div className='col-md-12 table-responsive'>
                                <table className="table-bordered table table-hover w-100">
                                    <thead>
                                        <tr>
                                            <td>Sl.</td>
                                            <td>image</td>
                                            <td>Title</td>
                                            <td>Price</td>
                                            <td>Quantity</td>
                                            <td>Subtotal</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order?.cart?.map((product, index) =>
                                        (
                                            <tr key={product._id}>
                                                <td> {index + 1}.</td>
                                                <td> <img src={product.image} alt={product.image}
                                                    style={{ width: '50px', height: '45px', objectFit: 'cover' }} /></td>
                                                <td>{product.title}</td>
                                                <td>{product.price}</td>
                                                <td>{product.quantity}</td>
                                                <td>{product.price * product.quantity}</td>
                                            </tr>
                                        ))}
                                        <tr >
                                            <td className='text-end' colSpan={6}>
                                                <span>Subtotal&nbsp;&nbsp;: <b style={{ paddingLeft: '50px' }}>$ {order?.total}</b></span><br />
                                                <span>Shipping&nbsp; &nbsp;: <b style={{ paddingLeft: '50px' }}>Free</b></span><br />
                                                <span>PromoCode Redeem&nbsp; &nbsp;: <b style={{ paddingLeft: '50px' }}>{order?.promoCodeRedeem ? order?.amountRedeem : 0}</b></span><br />
                                                <span>Total&nbsp; &nbsp;: <b style={{ paddingLeft: '50px' }}>$ {order?.total}</b></span><br />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }

        </>
    )
}

export default OrderDetail