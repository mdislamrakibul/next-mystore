/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React from 'react';
const Navbar = ({ }) =>
{
    const router = useRouter()
    const cookieUser = parseCookies()
    const user = cookieUser.user ? JSON.parse(cookieUser.user) : {}
    function isActive(route)
    {
        if (route == router.pathname) {
            return "active"
        }
        else ""
    }


    const signup = () =>
    {
        return (
            <li className={isActive('/auth/signup')}>
                <Link href="/auth/signup" >
                    <a style={{ display: 'flex' }}>
                        <span>Signup</span>&nbsp;
                        <i className="material-icons">lock_outline</i>
                    </a>
                </Link>
            </li>
        )
    }

    const login = () =>
    {
        return (
            <li className={isActive('/auth/login')}>
                <Link href="/auth/login" >
                    <a style={{ display: 'flex' }}>
                        <span>Login</span>&nbsp;
                        <i className="material-icons">lock_open</i>
                    </a>

                </Link>
            </li>
        )
    }
    const isLoggedAccount = () =>
    {
        return (
            <li className={isActive('/account')}>
                <Link href="/account">
                    <a style={{ display: 'flex' }}>
                        <span>Account</span>&nbsp;
                        <i className="material-icons">people_outline</i>
                    </a>
                </Link>
            </li>
        )
    }
    const logout = () =>
    {
        return (
            <li>
                <button className="btn red" onClick={() =>
                {
                    Cookies.remove('token')
                    Cookies.remove('user')
                    router.push('/auth/login')
                }}>logout</button>&nbsp;
                {/* <i className="material-icons">exit_to_app</i> */}
            </li>
        )
    }

    const userInfo = (user) =>
    {
        return (
            <span style={{ display: 'flex', alignItems: 'center' }}>
                {/* <img alt={user.username} src={user.image} style={{ width: '35px', height: '35px' }} />&nbsp; */}
                <b>Welcome, {user.username} </b>
            </span>
        )
    }
    return (
        <div>
            <nav className="nav-extended">
                <div className="nav-wrapper">
                    <Link href="/"><a className="brand-logo">My Store</a></Link>
                    <ul className="right hide-on-med-and-down">
                        <li>{user && user.username
                            ?
                            userInfo(user)
                            :
                            <span></span>
                        }
                        </li>
                        <li className={isActive('/cart')}>
                            <Link href="/cart">
                                <a style={{ display: 'flex' }}>
                                    <span>Cart</span>&nbsp;
                                    <i className="material-icons">shopping_cart</i>
                                </a>
                            </Link>
                        </li>
                        {(user && user._id && user.email && user.username) ? isLoggedAccount() : signup()}
                        {(user && user._id && user.email && user.username) ? logout() : login()}
                    </ul>
                </div>
                {(user && (user.role === 'root' || user.role === 'admin'))
                    ?
                    <div className="nav-content">
                        <ul className="tabs tabs-transparent">
                            <li className="tab"><Link href="/admin/dashboard"><a>Dashboard</a></Link></li>
                            <li className="tab"><Link href="/admin/product/create"><a>Product</a></Link></li>
                        </ul>
                    </div>
                    :
                    <div></div>
                }

            </nav>
        </div>
    )
}


export default Navbar