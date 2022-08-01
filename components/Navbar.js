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
    cookie.remove('token')
    cookie.remove('user')
    router.push('/login')
    localStorage.clear();
    dispatch({ type: 'AUTH', payload: {} })
    return router.push('/')
  }

  const adminRouter = () =>
  {
    return (
      <>
        <Link href="/users">
          <a className="dropdown-item">Users</a>
        </Link>
        <Link href="/create">
          <a className="dropdown-item">Products</a>
        </Link>
        <Link href="/categories">
          <a className="dropdown-item">Categories</a>
        </Link>
      </>
    )
  }

  const loggedRouter = () =>
  {
    return (
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src={user.image} alt={user.username}
            style={{
              borderRadius: '50%', width: '30px', height: '30px',
              transform: 'translateY(-3px)', marginRight: '3px'
            }} /> {user.username}
        </a>

        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link href="/profile">
            <a className="dropdown-item">Profile</a>
          </Link>
          {
            user.role === 'admin' && adminRouter()
          }
          <div className="dropdown-divider"></div>
          <button className="dropdown-item" onClick={handleLogout}>Logout</button>
        </div>
      </li>
    )
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link href="/">
          <a className="navbar-brand">MyStore</a>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav p-1">
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
            {
              (user && user.username)
                ?
                <div class="dropdown">
                  <span class=" dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={user.image} alt={user.username}
                      style={{
                        borderRadius: '50%', width: '30px', height: '30px',
                        transform: 'translateY(-3px)', marginRight: '3px'
                      }} /> {user.username}
                  </span>
                  <ul class="dropdown-menu d-flex">
                    <li>
                      <Link href="/account">
                        <a class="dropdown-item"><i class="fas fa-id-card-alt"></i>&nbsp;&nbsp;Account</a>
                      </Link>
                    </li>
                    <li class="dropdown-divider"></li>
                    <li style={{ cursor: 'pointer' }} onClick={() => handleLogout()}>
                      <a class="dropdown-item"><i class="fas fa-sign-out-alt"></i>&nbsp;&nbsp;Logout</a>
                    </li>
                  </ul>
                </div>
                // <li className="nav-item dropdown">
                //   <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                //     <img src={user.image} alt={user.username}
                //       style={{
                //         borderRadius: '50%', width: '30px', height: '30px',
                //         transform: 'translateY(-3px)', marginRight: '3px'
                //       }} /> {user.username}
                //   </a>

                //   <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                //     <Link href="/profile">
                //       <a className="dropdown-item">Profile</a>
                //     </Link>
                //     {
                //       user.role === 'admin' && adminRouter()
                //     }
                //     <div className="dropdown-divider"></div>
                //     <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                //   </div>
                // </li>
                :

                <li className="nav-item">
                  <Link href="/signup">
                    <a className={"nav-link" + isActive('/signup')}>
                      <i class="fas fa-user-plus"></i> Join
                    </a>
                  </Link>
                </li>
            }
          </ul>
        </div>
      </nav>
    </>
  )
}


export default NavBar