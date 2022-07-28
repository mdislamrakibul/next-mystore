import cookie from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
const NavBar = () =>
{
  const router = useRouter()
  const cookieUser = parseCookies()
  const user = cookieUser.user ? JSON.parse(cookieUser.user) : ""
  const { state, dispatch } = useContext(DataContext)
  const { cart } = state

  function isActive(route)
  {
    if (route == router.pathname) {
      return "active"
    }
    else ""
  }

  return (
    <nav className="nav-extended">
      <div className="nav-wrapper #ff9e80 deep-orange accent-1 darken-3">
        <Link href="/"><a className="brand-logo left">MyStore</a></Link>
        <ul id="nav-mobile" className="right">
          {
            (user && user.username && user.image) &&
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <img alt={user.username} src={user.image} style={{ width: '35px', height: '35px' }} />&nbsp;
              <b><span>Welcome, {user.username}@{user.role}</span> </b>
            </li>
          }
          <li className={isActive('/cart')}>
            <Link href="/cart">
              <b>
                <a style={{ display: 'flex' }}>
                  <span style={{ color: 'white' }}><sup>{cart.length}</sup></span>&nbsp;
                  <span>Cart</span>&nbsp;
                  <i className="material-icons">shopping_cart</i>

                </a>
              </b>
            </Link>
          </li>
          {/* {
            (user.role == 'admin' || user.role == 'root') &&
            <li className={isActive('/create')}><Link href="/create"><a>create</a></Link></li>
          } */}

          {user ?
            <>
              <li className={isActive('/account')}>
                <Link href="/account">
                  <b>
                    <a style={{ display: 'flex' }}>
                      <span>Account</span>&nbsp;
                      <i className="material-icons">people_outline</i>
                    </a>
                  </b>
                </Link>
              </li>
              <li><button className="btn red" onClick={() =>
              {
                cookie.remove('token')
                cookie.remove('user')
                router.push('/login')
              }}>logout</button></li>
            </>
            :
            <>
              <li className={isActive('/login')}>
                <Link href="/login" >
                  <b>
                    <a style={{ display: 'flex' }}>
                      <span>Login</span>&nbsp;
                      <i className="material-icons">lock_open</i>
                    </a>
                  </b>
                </Link>
              </li>
              <li className={isActive('/signup')}>
                <Link href="/signup">
                  <b>
                    <a style={{ display: 'flex' }}>
                      <span>Signup</span>&nbsp;
                      <i className="material-icons">lock_outline</i>
                    </a>
                  </b>
                </Link>
              </li>
            </>
          }
        </ul>
      </div>
      {(user && (user.role === 'root' || user.role === 'admin'))
        &&
        <div className="nav-content">
          <ul className="tabs tabs-transparent">
            <li className="tab">
              <Link href="/admin/dashboard">
                <b>
                  <a style={{ display: 'flex', alignItems: 'center' }}>
                    <span>Dashboard</span>&nbsp;
                    <i className="material-icons">dashboard</i>
                  </a>
                </b>
              </Link>
            </li>
            <li className="tab">
              <Link href="/admin/product/create">
                <b>
                  <a style={{ display: 'flex', alignItems: 'center' }}>
                    <span>Product</span>&nbsp;
                    <i className="material-icons">next_week</i>
                  </a>
                </b>
              </Link>
            </li>
          </ul>
        </div>
      }
    </nav>
  )
}


export default NavBar