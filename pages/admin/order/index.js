import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../../store/GlobalState';
import Link from 'next/link';
import Loading from '../../../components/Loading';
import Pagination from '../../../components/Pagination';
import { postData, getData } from '../../../helpers/dataOps';
import { parseCookies } from 'nookies';
import { errorMsg, successMsg } from '../../../helpers/Toastify';
import Cookie from 'js-cookie';

function OrderIndex() {

    const { token } = parseCookies()
    const user = Cookie.get('user') ?? JSON.parse(Cookie.get('user'))
    const { state, dispatch } = useContext(DataContext)
    const { auth, notify, orders } = state

    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [recordsPerPage] = useState(10);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = orders.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(orders.length / recordsPerPage)


    const handleReject = (order) => {
        setIsLoading(true)
        if (order.delivered || order.paid) {
            setIsLoading(false)
            errorMsg('You cannot reject this order')
            return
        }
        postData('order/reject', order, token)
            .then(res => {
                setIsLoading(false)
                if (!res.status) {
                    errorMsg(res.message)
                    return
                }
                getData('order', token)
                    .then(res => {
                        dispatch({ type: 'GET_ORDER', payload: res.data })
                    })
                successMsg(res.message)
            })
    }

    return (
        <div>
            {(!orders.length || isLoading) && <Loading />}
            <div className='justify-content-between'>
                <h3 className="text-uppercase">Orders</h3>
                <h5>Total : {orders.length}</h5>
            </div>

            <div className="my-3 table-responsive">
                <table className="table table-bordered table-hover w-100 text-uppercase"
                >
                    <thead className="bg-light font-weight-bold">
                        <tr style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                            <td className="p-2">Sl.</td>
                            <td className="p-2">id</td>
                            <td className="p-2">date</td>
                            <td className="p-2">total</td>
                            <td className="p-2">Method</td>
                            <td className="p-2">delivered</td>
                            <td className="p-2">paid</td>
                            <td className="p-2">Status</td>

                        </tr>
                    </thead>

                    <tbody>
                        {
                            currentRecords.map((order, index) => (
                                <tr key={order._id} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    <td>{index + 1}.</td>
                                    <td className="p-2">
                                        <Link href={`/admin/order/${order._id}`}>
                                            <a style={{ textDecoration: 'none', color: 'slateblue' }}>{order._id}</a>
                                        </Link>

                                    </td>
                                    <td className="p-2">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-2">${order.total}</td>
                                    <td className="p-2">{order.method}</td>
                                    <td className="p-2">
                                        {
                                            order.delivered
                                                ? <i className="fas fa-check-circle text-success"></i>
                                                : <i className="fas fa-times-circle text-danger"></i>
                                        }
                                    </td>
                                    <td className="p-2">
                                        {
                                            order.paid
                                                ? <i className="fas fa-check-circle text-success"></i>
                                                : <i className="fas fa-times-circle text-danger"></i>
                                        }
                                    </td>
                                    <td className="p-2">
                                        {
                                            order.rejectedIs
                                                ? <img src='https://res.cloudinary.com/x-gwkjs-8zn7m-3/image/upload/v1661766788/reject_chofzx.png' width="50px" />
                                                : <>
                                                    {
                                                        (order.paid || order.delivered)
                                                            ?
                                                            <img src='https://res.cloudinary.com/x-gwkjs-8zn7m-3/image/upload/v1661763694/delivered-stamp-delivered-rubber-stamp-illustration-isolated-white-background-124829036-removebg-preview_nnelrh.png' width="50px" />
                                                            :
                                                            <div>
                                                                <img src='https://res.cloudinary.com/x-gwkjs-8zn7m-3/image/upload/v1661766343/depositphotos_34813181-stock-photo-in-progress-grunge-red-round-removebg-preview_nopk3d.png' width="50px" style={{ marginRight: "5px" }} />
                                                                {user && user.role === 'root' && <i className="fas fa-trash-alt text-danger" onClick={() => handleReject(order)} style={{ cursor: 'pointer' }}></i>}
                                                            </div>

                                                    }
                                                </>
                                        }

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>
            <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}

export default OrderIndex