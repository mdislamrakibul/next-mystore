import Head from 'next/head';
import React from 'react';
import Modal from '../Modal';
import NavBar from '../Navbar';

function AdminLayout({ children })
{
    return (
        <>
            <Head>

                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet"></link>
                {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" /> */}
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" ></link>
                <link rel="stylesheet" href="/style.css" />
            </Head>
            <NavBar />
            <Modal />
            <div className='row'>
                <div className='col-md-4'>
                    <div className="flex-shrink-0 p-3 bg-white" style={{ width: '280px' }}>
                        <a href="/" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
                            <span className="fs-5 fw-semibold">Admin Panel</span>
                        </a>
                        <ul className="list-unstyled ps-0">
                            <li className="mb-1">
                                <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                    Home
                                </button>
                                <div className="collapse show" id="home-collapse">
                                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Overview</a></li>
                                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Updates</a></li>
                                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Reports</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="mb-1">
                                <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                                    Dashboard
                                </button>
                                <div className="collapse" id="dashboard-collapse">
                                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Overview</a></li>
                                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Weekly</a></li>
                                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Monthly</a></li>
                                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Annually</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="mb-1">
                                <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                                    Orders
                                </button>
                                <div className="collapse" id="orders-collapse">
                                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">New</a></li>
                                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Processed</a></li>
                                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Shipped</a></li>
                                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Returned</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="border-top my-3"></li>
                            <li className="mb-1">
                                <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                                    Account
                                </button>
                                <div className="collapse" id="account-collapse">
                                    <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">New...</a></li>
                                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Profile</a></li>
                                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Settings</a></li>
                                        <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Sign out</a></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='col-md-8'>
                    {children}
                </div>
            </div>
            {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script> */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" ></script>
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

        </>
    )
}

export default AdminLayout