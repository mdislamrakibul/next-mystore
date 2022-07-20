import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
const Navbar = () =>
{
    const router = useRouter()
    const activeRoute = (routeName) =>
    {
        if (router.pathname === routeName) {
            return 'active'
        }
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
                    <Link href="/"><a className="brand-logo">Logo</a></Link>
                    <ul className="right hide-on-med-and-down">
                        <li className={activeRoute('/auth/login')}>
                            <Link href="/auth/login" >
                                <a style={{ display: 'flex' }}>
                                    <span>Login</span>&nbsp;
                                    <i className="material-icons">lock_open</i>
                                </a>

                            </Link>
                        </li>
                        <li className={activeRoute('/auth/signup')}>
                            <Link href="/auth/signup" >
                                <a style={{ display: 'flex' }}>
                                    <span>Signup</span>&nbsp;
                                    <i className="material-icons">lock_outline</i>
                                </a>
                            </Link>
                        </li>
                        <li className={activeRoute('/product/create')}>
                            <Link href="/product/create" >
                                <a style={{ display: 'flex' }}>
                                    <span>Create</span>&nbsp;
                                    {/* <i className="material-icons">lock_outline</i> */}
                                </a>
                            </Link>
                        </li>
                        {/* <li><a className='dropdown-trigger btn' href='#' data-target='dropdown1'>Dropdown<i className="material-icons right">arrow_drop_down</i></a></li> */}
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar