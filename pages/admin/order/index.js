import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../../store/GlobalState';
import Link from 'next/link';
import Loading from '../../../components/Loading';
import Pagination from '../../../components/Pagination';

function OrderIndex() {

    const { state, dispatch } = useContext(DataContext)
    const { auth, notify, orders } = state

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = orders.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(orders.length / recordsPerPage)

    return (
        <div>
            {!orders.length && <Loading />}
            <h3 className="text-uppercase">Orders</h3>

            <div className="my-3 table-responsive">
                <table className="table table-bordered table-hover w-100 text-uppercase"
                >
                    <thead className="bg-light font-weight-bold">
                        <tr>
                            <td className="p-2">Sl.</td>
                            <td className="p-2">id</td>
                            <td className="p-2">date</td>
                            <td className="p-2">total</td>
                            <td className="p-2">Method</td>
                            <td className="p-2">delivered</td>
                            <td className="p-2">paid</td>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            currentRecords.map((order, index) => (
                                <tr key={order._id}>
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