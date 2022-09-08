import React, { useEffect, useState } from 'react';
import { getData } from '../../../helpers/dataOps';
import { parseCookies } from 'nookies';
import Cookies from 'js-cookie';
import Loading from '../../../components/Loading';

function Dashboard() {
    const { token } = parseCookies()
    const user = Cookies.get('user') && JSON.parse(Cookies.get('user'))
    const [response, setResponse] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        getData('dashboard', token)
            .then(res => {
                setIsLoading(false)
                if (!res.status) {
                    return
                }
                setResponse(res.data)
                // console.log(response);
            })
    }, [])

    return (
        <>
            {isLoading && <Loading />}
            {response && user
                &&
                <div>
                    {user.role === 'root' &&
                        <>
                            <div className="alert alert-secondary">
                                <div>Basic</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
                                    <div className="card card-statistic-1">
                                        <div className="card-icon" style={{ backgroundColor: '#e8103c' }}>
                                            <i className="fas fa-users"></i>
                                        </div>
                                        <div className="card-wrap">
                                            <div className="card-header">
                                                <h6>Total User</h6>
                                            </div>
                                            <div className="card-body">
                                                {response?.user}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
                                    <div className="card card-statistic-1">
                                        <div className="card-icon" style={{ backgroundColor: '#cc10e8' }}>
                                            <i className="fas fa-couch"></i>
                                        </div>
                                        <div className="card-wrap">
                                            <div className="card-header">
                                                <h6>Total Product</h6>
                                            </div>
                                            <div className="card-body">
                                                {response?.product}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
                                    <div className="card card-statistic-1">
                                        <div className="card-icon" style={{ backgroundColor: '#efff2e' }}>
                                            <i className="fas fa-tape"></i>
                                        </div>
                                        <div className="card-wrap">
                                            <div className="card-header">
                                                <h6>Total Category</h6>
                                            </div>
                                            <div className="card-body">
                                                {response?.category}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
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
                        {user && user !== 'user' &&
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
                        }
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
        </>
    )
}


export default Dashboard