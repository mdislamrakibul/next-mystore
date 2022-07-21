/* eslint-disable react-hooks/exhaustive-deps */
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React from 'react'
const Navbar = ({ }) =>
{
    const router = useRouter()
    const cookieUser = parseCookies()
    const user = cookieUser.user ? JSON.parse(cookieUser.user) : ""

    function isActive(route)
    {
        if (route == router.pathname) {
            return "active"
        }
        else ""
    }


    return (
        <>
            <ul id='dropdown1' className='dropdown-content'>
                <li><a href="#!">one</a></li>
                <li><a href="#!">two</a></li>
                <li className="divider" tabIndex="-1"></li>
                <li><a href="#!">three</a></li>
                <li><a href="#!"><i className="material-icons">view_module</i>four</a></li>
                <li><a href="#!"><i className="material-icons">cloud</i>five</a></li>
            </ul>
            <nav>
                <div className="nav-wrapper">
                    <Link href="/"><a className="brand-logo">My Store</a></Link>
                    <ul className="right hide-on-med-and-down">
                        <li className={isActive('/cart')}>
                            <Link href="/cart">
                                <a style={{ display: 'flex' }}>
                                    <span>Cart</span>&nbsp;
                                    <i className="material-icons">shopping_cart</i>
                                </a>
                            </Link>
                        </li>

                        {user
                            ?
                            <>
                                <li className={isActive('/account')}>
                                    <Link href="/account">
                                        <a style={{ display: 'flex' }}>
                                            <span>Account</span>&nbsp;
                                            <i className="material-icons">people_outline</i>
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <button className="btn red" onClick={() =>
                                    {
                                        Cookies.remove('token')
                                        Cookies.remove('user')
                                        router.push('/auth/login')
                                    }}>logout</button>&nbsp;
                                    <i className="material-icons">exit_to_app</i>
                                </li>
                            </>
                            :
                            <>
                                <li className={isActive('/auth/login')}>
                                    <Link href="/auth/login" >
                                        <a style={{ display: 'flex' }}>
                                            <span>Login</span>&nbsp;
                                            <i className="material-icons">lock_open</i>
                                        </a>

                                    </Link>
                                </li>
                                <li className={isActive('/auth/signup')}>
                                    <Link href="/auth/signup" >
                                        <a style={{ display: 'flex' }}>
                                            <span>Signup</span>&nbsp;
                                            <i className="material-icons">lock_outline</i>
                                        </a>
                                    </Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}


export default Navbar