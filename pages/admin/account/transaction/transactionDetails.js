import Cookies from 'js-cookie';
import { parseCookies } from 'nookies';
import React, { useState } from 'react'
import Loading from '../../../../components/Loading';
import { getData, patchData, putData } from '../../../../helpers/dataOps';
import { errorMsg, successMsg } from '../../../../helpers/Toastify';
import moment from 'moment';

function TransactionDetails({ transactionDetail, state, dispatch }) {
    const { onlinePay } = state
    const { token } = parseCookies()
    const user = Cookies.get('user') && JSON.parse(Cookies.get('user'))
    const [isLoading, setIsLoading] = useState(false)
    if (!user) return null;

    const handleDelivered = (transaction) => {
        setIsLoading(true)
        patchData(`account/transaction/${transaction?._id}`, {}, token)
            .then(res => {
                setIsLoading(false)
                if (!res.status) {
                    errorMsg(res.message)
                    return
                }
                getData('account/transaction', token)
                    .then(res => {
                        dispatch({
                            type: "ONLINE_PAY", payload: res.data
                        })
                    })
                successMsg(res.message)
            })
    }
    return (
        <div>
            {isLoading && <Loading />}
            {transactionDetail.map(transaction => (
                <div key={transaction?._id} style={{ margin: '20px auto', position: 'relative', fontWeight: 'bold' }} className="row justify-content-around">
                    {transaction?.isDelivered ?
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
                            }} />
                        :
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
                            }} />
                    }

                    <div className='my-3'>
                        <div className='justify-content-between'>
                            <h4 className="text-break">Transaction Details</h4>
                            <div className="justify-content-between">
                                {
                                    transaction?.isDelivered
                                        ?
                                        <span style={{ color: 'green' }}>[Delivered on {moment(transaction?.deliveryDate).format('MMMM Do YYYY, h:mm:ss')}]&nbsp;</span>
                                        : <span style={{ color: 'red' }}>[Not Delivered]&nbsp;</span>
                                }
                                {
                                    user && user.role === 'root' && !transaction?.isDelivered &&
                                    <button className="btn btn-sm btn-success text-uppercase"
                                        onClick={() => handleDelivered(transaction)}>
                                        <i className="fas fa-truck"></i>&nbsp; &nbsp; Mark as delivered
                                    </button>
                                }
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <div className='col-md-12'>
                                <div className="alert alert-primary" style={{ opacity: '.5' }}>
                                    <h6 className="text-break">Transaction##{transaction?._id}</h6>
                                </div>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td >Brand</td>
                                                        <td>&nbsp; &nbsp;: &nbsp; &nbsp; {transaction?.brand}</td>
                                                    </tr>
                                                    <tr>
                                                        <td >Funding</td>
                                                        <td>&nbsp; &nbsp;: &nbsp; &nbsp; {transaction?.funding}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Ip</td>
                                                        <td>&nbsp; &nbsp;: &nbsp; &nbsp; {transaction?.client_ip}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Country</td>
                                                        <td>&nbsp; &nbsp;: &nbsp; &nbsp; {transaction?.country}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>


                                        <div className='col-md-6'>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td  >Type</td>
                                                        <td>&nbsp; &nbsp;: &nbsp; &nbsp; {transaction?.type}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Exp Date</td>
                                                        <td>&nbsp; &nbsp;: &nbsp; &nbsp; {transaction?.exp_month}/{transaction?.exp_year}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Card</td>
                                                        <td>&nbsp; &nbsp;: &nbsp; &nbsp; **** **** **** {transaction?.last4}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>Delivered</td>
                                                        <td>&nbsp; &nbsp;: &nbsp; &nbsp; {transaction?.isDelivered
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
                                                <td>&nbsp; &nbsp;: &nbsp;&nbsp;{transaction?.user.firstName}</td>
                                            </tr>
                                            <tr>
                                                <td   >LastName</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{transaction?.user.lastName}</td>
                                            </tr>
                                            <tr>
                                                <td   >Username</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{transaction?.user.username}</td>
                                            </tr>
                                            <tr>
                                                <td   >Email</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{transaction?.user.email}</td>
                                            </tr>
                                            <tr>
                                                <td   >Phone</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{transaction?.user.phone}</td>
                                            </tr>
                                            <tr>
                                                <td   >Address</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{transaction?.user.address}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className="alert alert-primary" style={{ opacity: '.5' }}>
                                    <h6 className="text-break">Card Information</h6>
                                </div>
                                <div className='container'>
                                    <table>
                                        <tbody>
                                            <tr >
                                                <td   >Name</td>
                                                <td>&nbsp; &nbsp;: &nbsp;&nbsp;{transaction?.name}</td>
                                            </tr>

                                            <tr>
                                                <td   >Email</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{transaction?.email}</td>
                                            </tr>

                                            <tr>
                                                <td   >Address</td>
                                                <td>&nbsp; &nbsp;: &nbsp; &nbsp;{transaction?.address_city}, {transaction?.address_line1}-{transaction?.address_zip}, {transaction?.address_country}</td>
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
                                        {transaction?.cart?.map((product, index) =>
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
                                                <span>Total&nbsp;&nbsp;: <b style={{ paddingLeft: '50px' }}>$ {transaction?.totalPrice}</b></span><br />
                                                <span>Shipping&nbsp; &nbsp;: <b style={{ paddingLeft: '50px' }}>Free</b></span><br />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            ))}

        </div>
    )
}

export default TransactionDetails