import { parseCookies } from 'nookies'
import React, { useContext, useState } from 'react'
import Cookie from 'js-cookie';
import { DataContext } from '../../../store/GlobalState';
import Loading from '../../../components/Loading';
import Pagination from '../../../components/Pagination';

function Transaction() {

    const { token } = parseCookies()
    const user = Cookie.get('user') && JSON.parse(Cookie.get('user'))
    const { state, dispatch } = useContext(DataContext)
    const { auth, notify, orders, onlinePay } = state
    console.log('🚀 ~ file: transaction.js ~ line 14 ~ Transaction ~ onlinePay', onlinePay);

    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [recordsPerPage] = useState(10);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = onlinePay.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(onlinePay.length / recordsPerPage)



    return (
        <div>
            {(!onlinePay.length || isLoading) && <Loading />}
            <div className='justify-content-between'>
                <h3 className="text-uppercase">Transactions</h3>
                <h5>Total : {onlinePay.length}</h5>
            </div>
            <div className="my-3 table-responsive">
                <table className="table table-bordered table-hover w-100 text-uppercase"
                >
                    <thead className="bg-light font-weight-bold">
                        <tr style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                            <td className="p-2">Sl.</td>
                            <td className="p-2">Name</td>
                            <td className="p-2">Funding</td>
                            <td className="p-2">Type</td>
                            <td className="p-2">Total Price</td>
                            <td className="p-2">Purchased Date</td>
                            <td className="p-2">Action</td>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            currentRecords.map((pay, index) => (
                                <tr key={pay._id} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    <td>{index + 1}.</td>
                                    <td>{pay.name}</td>
                                    <td className="p-2">
                                        {pay.funding}
                                    </td>

                                    <td className="p-2">{pay.type}</td>
                                    <td className="p-2">${pay.totalPrice}</td>
                                    <td className="p-2">
                                        {new Date(pay.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-2">
                                        <button className='btn btn-sm btn-info'>
                                            Details
                                        </button>
                                    </td>
                                    {/*<td className="p-2">
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

                                    </td> */}
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

export default Transaction