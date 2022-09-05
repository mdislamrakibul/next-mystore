import { parseCookies } from 'nookies'
import React, { useContext, useState } from 'react'
import Cookie from 'js-cookie';
import { DataContext } from '../../../../store/GlobalState';
import Loading from '../../../../components/Loading';
import Pagination from '../../../../components/Pagination';
import Link from 'next/link';
import TransactionDetails from './transactionDetails';

function TransactionIndex() {

    const { token } = parseCookies()
    const user = Cookie.get('user') && JSON.parse(Cookie.get('user'))
    const { state, dispatch } = useContext(DataContext)
    const { auth, notify, orders, onlinePay } = state

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
            <div className="alert alert-secondary justify-content-between">
                <div className="text-uppercase">Transaction</div>
                <div>Total : {onlinePay.length}</div>
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
                            <td className="p-2">Payment Date</td>
                            <td className="p-2">Status</td>
                            {user && user !== 'admin' && <td className="p-2">Action</td>}
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
                                        {
                                            pay.isDelivered
                                                ? <img src='https://res.cloudinary.com/x-gwkjs-8zn7m-3/image/upload/v1661763694/delivered-stamp-delivered-rubber-stamp-illustration-isolated-white-background-124829036-removebg-preview_nnelrh.png' width="50px" />
                                                : <img src='https://res.cloudinary.com/x-gwkjs-8zn7m-3/image/upload/v1661766343/depositphotos_34813181-stock-photo-in-progress-grunge-red-round-removebg-preview_nopk3d.png' width="50px" />
                                        }

                                    </td>
                                    {user && user !== 'admin' && <td className="p-2">
                                        <Link href={`/admin/account/transaction/${pay._id}`}>
                                            <a style={{ textDecoration: 'none', color: 'slateblue' }}>Details</a>
                                        </Link>
                                    </td>}
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

export default TransactionIndex