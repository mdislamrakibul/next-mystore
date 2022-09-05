import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { parseCookies } from 'nookies';
import Cookies from 'js-cookie';
function Sidebar() {
    const router = useRouter()
    const { token } = parseCookies()
    const user = Cookies.get('user') && JSON.parse(Cookies.get('user'))
    const isActive = (r) => {
        if (r === router.pathname) {
            return " active"
        } else {
            return ""
        }
    }
    return (
        <>
            <div className="flex-shrink-0 p-3 bg-white" style={{ width: '280px' }}>
                <Link href="/admin/dashboard" >
                    <a className="pb-3 mb-3 link-dark text-decoration-none border-bottom">
                        <h5 >
                            {(user && user.role === 'user') ? 'User' : 'Admin'} Panel
                        </h5>
                        <h6 >
                            Welcome, {user && user.email}
                        </h6>
                    </a>
                </Link>
                <hr />
                <ul className="list-unstyled ps-0">
                    {user && user.role !== 'user' &&
                        <li className="mb-1">
                            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#product-collapse" aria-expanded="false">
                                <i className="fas fa-tasks"></i>&nbsp;Product Management
                            </button>
                            <div className="collapse" id="product-collapse" style={{ marginLeft: '50px' }}>
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small" >
                                    <li>
                                        <Link href='/admin/product/list'>
                                            <a className={"link-dark d-inline-flex text-decoration-none rounded" + isActive('/admin/product/list')}>
                                                <i className="fas fa-list-ol"></i>&nbsp;All Product
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href='/admin/product/create'>
                                            <a className={"link-dark d-inline-flex text-decoration-none rounded" + isActive('/admin/product/create')}>
                                                <i className="fas fa-plus"></i>&nbsp;Add Product
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    }

                    {user && user.role !== 'user' &&
                        <li className="mb-1">
                            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
                                <i className="fas fa-hammer"></i>&nbsp;Settings
                            </button>
                            {/* show */}
                            <div className="collapse" id="home-collapse" style={{ marginLeft: '50px' }}>
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li>
                                        <Link href='/admin/user'>
                                            <a className={"link-dark d-inline-flex text-decoration-none rounded" + isActive('/admin/user')}>
                                                <i className="fas fa-user-ninja"></i>&nbsp;User management
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href='/admin/category'>
                                            <a className={"link-dark d-inline-flex text-decoration-none rounded" + isActive('/admin/category')}>
                                                <i className="fas fa-tags"></i>&nbsp;Category management
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    }

                    <li className="mb-1">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                            <i className="far fa-file-archive"></i>&nbsp;Orders
                        </button>
                        <div className="collapse" id="orders-collapse" style={{ marginLeft: '50px' }}>
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>
                                    <Link href='/admin/order'>
                                        <a className={"link-dark d-inline-flex text-decoration-none rounded" + isActive('/admin/order')}>
                                            <i className="fas fa-sort-amount-down-alt"></i>&nbsp;All Order
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="mb-1">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#accounts-collapse" aria-expanded="false">
                            <i className="fas fa-file-invoice-dollar"></i>&nbsp;Accounts
                        </button>
                        <div className="collapse" id="accounts-collapse" style={{ marginLeft: '50px' }}>
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>
                                    <Link href='/admin/account/transaction'>
                                        <a className={"link-dark d-inline-flex text-decoration-none rounded" + isActive('/admin/account/transaction')}>
                                            <i className="fas fa-sort-amount-down-alt"></i>&nbsp;Transactions
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}
export default Sidebar