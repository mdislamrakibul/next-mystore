import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getData, patchData } from '../../../helpers/dataOps';
import Loading from '../../../components/Loading';
import { parseCookies } from 'nookies';
import baseUrl from '../../../helpers/baseUrl';

function UserDetails() {
    const router = useRouter()
    const { token } = parseCookies()
    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState({})
    useEffect(() => {
        setIsLoading(true)
        patchData(`user/details/${router.query.id}`, {}, token)
            .then(res => {
                setIsLoading(false)
                setResponse(res.data)
                console.log(res);
            })

    }, [])

    return (
        <div>
            <Head>
                User Details
            </Head>
            <div>
                {isLoading && <Loading />}
                <div className="alert alert-secondary justify-content-between d-flex">
                    <h4 className="text-break">User History</h4>
                    <button className="btn btn-sm btn-danger" onClick={() => router.back()}>
                        <i className="fas fa-long-arrow-alt-left" aria-hidden="true"></i>
                    </button>
                </div>
                {response &&
                    <div>
                        <div className="alert alert-secondary">
                            <div>Order [Cash on delivery]</div>
                        </div>
                        <div className='row'>
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
                                <div className="card card-statistic-1">
                                    <div className="card-icon bg-primary">
                                        <i className="fas fa-box-open"></i>
                                    </div>
                                    <div className="card-wrap">
                                        <div className="card-header">
                                            <h6>Total Order</h6>
                                        </div>
                                        <div className="card-body">
                                            {response?.orderTotal}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
                                <div className="card card-statistic-1">
                                    <div className="card-icon bg-success">
                                        <i className="fas fa-check"></i>
                                    </div>
                                    <div className="card-wrap">
                                        <div className="card-header">
                                            <h6>Successful Delivery</h6>
                                        </div>
                                        <div className="card-body">
                                            {response?.orderDelivery}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
                                <div className="card card-statistic-1">
                                    <div className="card-icon" style={{ backgroundColor: '#ff8e2e' }}>
                                        <i className="fas fa-question"></i>
                                    </div>
                                    <div className="card-wrap">
                                        <div className="card-header">
                                            <h6>Pending Order</h6>
                                        </div>
                                        <div className="card-body">
                                            {response?.orderPending}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
                                <div className="card card-statistic-1">
                                    <div className="card-icon bg-info">
                                        <i className="fas fa-spinner"></i>
                                    </div>
                                    <div className="card-wrap">
                                        <div className="card-header">
                                            <h6>In Progress Order</h6>
                                        </div>
                                        <div className="card-body">
                                            {response?.orderInProgress}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
                                <div className="card card-statistic-1">
                                    <div className="card-icon bg-danger">
                                        <i className="fas fa-money-bill"></i>
                                    </div>
                                    <div className="card-wrap">
                                        <div className="card-header">
                                            <h6>Rejected Order</h6>
                                        </div>
                                        <div className="card-body">
                                            {response?.orderRejected}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="alert alert-secondary">
                            <div>Online Transaction</div>
                        </div>
                        <div className='row'>
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
                                <div className="card card-statistic-1">
                                    <div className="card-icon bg-primary">
                                        <i className="far fa-user"></i>
                                    </div>
                                    <div className="card-wrap">
                                        <div className="card-header">
                                            <h6>Total Online Payment</h6>
                                        </div>
                                        <div className="card-body">
                                            {response?.onlinePayCount}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
                                <div className="card card-statistic-1">
                                    <div className="card-icon bg-success">
                                        <i className="fas fa-check"></i>
                                    </div>
                                    <div className="card-wrap">
                                        <div className="card-header">
                                            <h6>Successful Delivery</h6>
                                        </div>
                                        <div className="card-body">
                                            {response?.successOnlinePay}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
                                <div className="card card-statistic-1">
                                    <div className="card-icon bg-warning">
                                        <i className="fas fa-question"></i>
                                    </div>
                                    <div className="card-wrap">
                                        <div className="card-header">
                                            <h6>Pending Delivery</h6>
                                        </div>
                                        <div className="card-body">
                                            {response?.pendingOnlinePay}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="alert alert-secondary">
                            <div>Accounts</div>
                        </div>
                        <div className='row'>
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
                                <div className="card card-statistic-1">
                                    <div className="card-icon bg-primary">
                                        <i className="fas fa-money-check-alt"></i>
                                    </div>
                                    <div className="card-wrap">
                                        <div className="card-header">
                                            <h6>Total Payment</h6>
                                        </div>
                                        <div className="card-body">
                                            ${response?.totalIncome}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
                                <div className="card card-statistic-1">
                                    <div className="card-icon bg-success">
                                        <i className="fas fa-truck-loading"></i>
                                    </div>
                                    <div className="card-wrap">
                                        <div className="card-header">
                                            <h6>Cash on delivery</h6>
                                        </div>
                                        <div className="card-body">
                                            ${response?.cod}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
                                <div className="card card-statistic-1">
                                    <div className="card-icon bg-success">
                                        <i className="fas fa-globe"></i>
                                    </div>
                                    <div className="card-wrap">
                                        <div className="card-header">
                                            <h6>Online payment</h6>
                                        </div>
                                        <div className="card-body">
                                            ${response?.onlinePay}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
                                <div className="card card-statistic-1">
                                    <div className="card-icon bg-warning">
                                        <i className="fas fa-question"></i>
                                    </div>
                                    <div className="card-wrap">
                                        <div className="card-header">
                                            <h6>Pending payment</h6>
                                        </div>
                                        <div className="card-body">
                                            ${response?.pendingPayment}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
                                <div className="card card-statistic-1">
                                    <div className="card-icon bg-info">
                                        <i className="fas fa-spinner"></i>
                                    </div>
                                    <div className="card-wrap">
                                        <div className="card-header">
                                            <h6>In Progress payment</h6>
                                        </div>
                                        <div className="card-body">
                                            ${response?.progressPayment}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
                                <div className="card card-statistic-1">
                                    <div className="card-icon bg-danger">
                                        <i className="fas fa-money-bill"></i>
                                    </div>
                                    <div className="card-wrap">
                                        <div className="card-header">
                                            <h6>Rejected Payment</h6>
                                        </div>
                                        <div className="card-body">
                                            ${response?.rejectedPayment}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

// export async function getServerSideProps({ params: { id } }) {
//     console.log('🚀 ~ file: [id].js ~ line 281 ~ getServerSideProps ~ id', id);
//     const res = await fetch(`${baseUrl}/api/user/details/${id}`)
//     // console.log('🚀 ~ file: [id].js ~ line 123 ~ getServerSideProps ~ res', res);
//     // const data = await res.json()
//     // if (data.status) {
//     //   return { props: { product: data.data } }
//     // }
//     return {
//         props: { product: {} }
//     }
// }

export default UserDetails