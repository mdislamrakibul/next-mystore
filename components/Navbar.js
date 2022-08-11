import Cookie from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { DataContext } from '../store/GlobalState'

function NavBar()
{
  const router = useRouter()
  const { state, dispatch } = useContext(DataContext)
  const { cart } = state
  // const { user, token } = parseCookies()
  const user = Cookie.get('user') && JSON.parse(Cookie.get('user'))

  const isActive = (r) =>
  {
    if (r === router.pathname) {
      return " active"
    } else {
      return ""
    }
  }

  const handleLogout = () =>
  {
    localStorage.clear()
    dispatch({ type: 'AUTH', payload: {} })
    Cookie.remove('user')
    Cookie.remove('token')
    return router.push('/')

  }

  return (
    <nav className="navbar navbar-expand-lg " aria-label="Offcanvas navbar large">
      <div className="container-fluid">
        <Link href="/"><a className="navbar-brand">MY STORE</a></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar2">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasNavbar2" aria-labelledby="offcanvasNavbar2Label">
          <div className="offcanvas-header">
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body" style={{ backgroundColor: 'white !important' }}>
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              {user && user.role === 'user' &&
                <li className="nav-item">
                  <Link href="/cart">
                    <a className={"nav-link" + isActive('/cart')}>
                      <i className="fas fa-shopping-cart position-relative" aria-hidden="true">
                        <span className="position-absolute"
                          style={{
                            padding: '3px 6px',
                            background: '#ed143dc2',
                            borderRadius: '50%',
                            top: '-10px',
                            right: '-10px',
                            color: 'white',
                            fontSize: '14px'
                          }}>
                          {cart.length}
                        </span>
                      </i> Cart
                    </a>
                  </Link>
                </li>
              }
              {user && user.role === 'root' &&

                <li>
                  <Link href="/admin/dashboard">
                    <a className={"nav-link" + isActive('/admin/dashboard')}>
                      <i className="fab fa-cpanel"></i>&nbsp;Dashboard
                    </a>
                  </Link>
                </li>

              }
              {user ?
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={user.image} alt="avatar" style={{
                      borderRadius: '50%', width: '30px', height: '30px',
                      transform: 'translateY(-3px)', marginRight: '3px'
                    }} />&nbsp;{user.username}
                  </span>
                  <ul className="dropdown-menu">
                    <li>
                      <Link href="/profile">
                        <a className={"dropdown-item" + isActive('/profile')}>
                          <i className="fas fa-id-badge"></i>&nbsp;Profile</a>
                      </Link>
                    </li>
                    <li className="dropdown-divider"></li>
                    <li onClick={() => handleLogout()} style={{ cursor: 'pointer' }}>
                      <a className="dropdown-item">
                        <i className="fas fa-sign-out-alt"></i>&nbsp;Logout
                      </a>
                    </li>
                  </ul>
                </li>
                :
                <li>
                  <Link href="/login">
                    <a className={"nav-link" + isActive('/login')}>
                      <i className="fas fa-sign-in-alt"></i>&nbsp;Login
                    </a>
                  </Link>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar