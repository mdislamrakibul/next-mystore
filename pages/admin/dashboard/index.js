import React from 'react';
// import AdminLayout from './../../components/admin/AdminLayout';
function Dashboard() {
    return (
        <>
            <div className="alert alert-secondary">
                <div>Dashboard</div>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
                    <div className="card card-statistic-1">
                        <div className="card-icon bg-primary">
                            <i className="far fa-paper-plane"></i>
                        </div>
                        <div className="card-wrap">
                            <div className="card-header">
                                <h5>Total Order</h5>
                            </div>
                            <div className="card-body">
                                16
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
                    <div className="card card-statistic-1">
                        <div className="card-icon bg-danger">
                            <i className="far fa-user"></i>
                        </div>
                        <div className="card-wrap">
                            <div className="card-header">
                                <h5>Total User</h5>
                            </div>
                            <div className="card-body">
                                18
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
                    <div className="card card-statistic-1">
                        <div className="card-icon bg-warning">
                            <i className="fas fa-university"></i>
                        </div>
                        <div className="card-wrap">
                            <div className="card-header">
                                <h5>Total Shop</h5>
                            </div>
                            <div className="card-body">
                                13
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
                    <div className="card card-statistic-1">
                        <div className="card-icon bg-success">
                            <i className="fas fa-money-bill"></i>
                        </div>
                        <div className="card-wrap">
                            <div className="card-header">
                                <h5>Total Income</h5>
                            </div>
                            <div className="card-body">
                                284,620.00
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Dashboard