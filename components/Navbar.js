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
    <nav class="navbar navbar-expand-lg " aria-label="Offcanvas navbar large">
      <div class="container-fluid">
        <Link href="/"><a class="navbar-brand">MY STORE</a></Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar2">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasNavbar2" aria-labelledby="offcanvasNavbar2Label">
          <div class="offcanvas-header">
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body" style={{ backgroundColor: 'white !important' }}>
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
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
              {user ?
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={user.image} alt={user.username} style={{
                      borderRadius: '50%', width: '30px', height: '30px',
                      transform: 'translateY(-3px)', marginRight: '3px'
                    }} />&nbsp;{user.username}
                  </a>
                  <ul class="dropdown-menu" >
                    <li>
                      <Link href="/account">
                        <a className={"dropdown-item" + isActive('/account')}>
                          <i class="fas fa-id-badge"></i>&nbsp;Account</a>
                      </Link>
                    </li>
                    <li class="dropdown-divider"></li>
                    <li onClick={() => handleLogout()} style={{ cursor: 'pointer' }}>
                      <a class="dropdown-item">
                        <i class="fas fa-sign-out-alt"></i>&nbsp;Logout
                      </a>
                    </li>
                  </ul>
                </li>
                :
                <li>
                  <Link href="/login">
                    <a className={"nav-link" + isActive('/login')}>
                      <i class="fas fa-sign-in-alt"></i>&nbsp;Login
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