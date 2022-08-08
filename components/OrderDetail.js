import { parseCookies } from 'nookies';
import { patchData } from '../helpers/dataOps';
import { updateItem } from '../store/Actions';
// import PaypalBtn from './paypalBtn';

const OrderDetail = ({ orderDetail, state, dispatch }) =>
{
    const { auth, orders } = state
    const { token, user } = parseCookies()
    const handleDelivered = (order) =>
    {
        dispatch({ type: 'NOTIFY', payload: { loading: true } })

        patchData(`order/delivered/${order._id}`, null, auth.token)
            .then(res =>
            {
                if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

                const { paid, dateOfPayment, method, delivered } = res.result

                dispatch(updateItem(orders, order._id, {
                    ...order, paid, dateOfPayment, method, delivered
                }, 'ADD_ORDERS'))

                return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
            })
    }

    if (!user) return null;
    return (
        <>
            {orderDetail.map(order => (
                <div key={order._id} style={{ margin: '20px auto' }} className="row justify-content-around">

                    <div className="my-3">
                        <h4 className="text-break">Order Details</h4>
                        <div className='row mb-3'>
                            <div className='col-md-12'>
                                <div class="alert alert-secondary" >
                                    <h6 className="text-break">Order##{order._id}</h6>
                                </div>
                                <div className='container'>

                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: '170px', textAlign: 'right' }}>Method</td>
                                                        <td>&nbsp; &nbsp;: &nbsp; &nbsp; {order.method}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '170px', textAlign: 'right' }}>Payment Id</td>
                                                        <td>&nbsp; &nbsp;: &nbsp; &nbsp; {order.paymentId}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '170px', textAlign: 'right' }}>PromoCode Redeem</td>
                                                        <td>&nbsp; &nbsp;: &nbsp; &nbsp; {order.promoCodeRedeem ? <i class="fas fa-check-circle text-success"></i>
                                                            : <i class="fas fa-times-circle text-danger"></i>}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>


                                        <div className='col-md-6'>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: '170px', textAlign: 'right' }}>Amount Redeem</td>
                                                        <td>&nbsp; &nbsp;: &nbsp; &nbsp; $ {order.amountRedeem}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '170px', textAlign: 'right' }}>Paid</td>
                                                        <td>&nbsp; &nbsp;: &nbsp; &nbsp; {order.paid ? <i class="fas fa-check-circle text-success"></i>
                                                            : <i class="fas fa-times-circle text-danger"></i>}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ width: '170px', textAlign: 'right' }}>Delivered</td>
                                                        <td>&nbsp; &nbsp;: &nbsp; &nbsp; {order.delivered
                                                            ? <i class="fas fa-check-circle text-success"></i>
                                                            : <i class="fas fa-times-circle text-danger"></i>}</td>
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
                                <div class="alert alert-secondary" >
                                    <h6 className="text-break">User Information</h6>
                                </div>
                                <div className='container'>
                                    <table>
                                        <tbody>
                                            <tr >
                                                <td style={{ width: '120px', textAlign: 'right' }}>FirstName</td>
                                                <td>&nbsp; &nbsp;: &nbsp;&nbsp;{order.user.firstName}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '120px', textAlign: 'right' }}>LastName</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{order.user.lastName}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '120px', textAlign: 'right' }}>Username</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{order.user.username}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '120px', textAlign: 'right' }}>Email</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{order.user.email}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '120px', textAlign: 'right' }}>Phone</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{order.user.phone}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '120px', textAlign: 'right' }}>Address</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{order.user.address}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div class="alert alert-secondary" >
                                    <h6 className="text-break">Buyer Information</h6>
                                </div>
                                <div className='container'>
                                    <table>
                                        <tbody>
                                            <tr >
                                                <td style={{ width: '120px', textAlign: 'right' }}>FirstName</td>
                                                <td>&nbsp; &nbsp;: &nbsp;&nbsp;{order.firstName}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '120px', textAlign: 'right' }}>LastName</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{order.lastName}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '120px', textAlign: 'right' }}>Email</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{order.email}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '120px', textAlign: 'right' }}>Phone</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{order.phone}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ width: '120px', textAlign: 'right' }}>Address</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{order.address}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div class="alert alert-secondary" >
                                <h6 className="text-break">Products</h6>
                            </div>
                            <div className='col-md-12 table-responsive'>
                                <table class="table-bordered table table-hover w-100">
                                    <thead>
                                        <tr>
                                            <td>#</td>
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
                                                <td> {index + 1}</td>
                                                <td> <img src={product.image} alt={product.image}
                                                    style={{ width: '50px', height: '45px', objectFit: 'cover' }} /></td>
                                                <td>{product.title}</td>
                                                <td>{product.price}</td>
                                                <td>{product.quantity}</td>
                                                <td>{product.price * product.quantity}</td>
                                            </tr>
                                        ))}
                                        <tr >
                                            <td className='text-end' colspan={6}>
                                                <span>Subtotal&nbsp;&nbsp;: <b style={{ paddingLeft: '50px' }}>$ {order.total}</b></span><br />
                                                <span>Shipping&nbsp; &nbsp;: <b style={{ paddingLeft: '50px' }}>Free</b></span><br />
                                                <span>PromoCode Redeem&nbsp; &nbsp;: <b style={{ paddingLeft: '50px' }}>{order.promoCodeRedeem ? order.amountRedeem : 0}</b></span><br />
                                                <span>Total&nbsp; &nbsp;: <b style={{ paddingLeft: '50px' }}>$ {order.total}</b></span><br />
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