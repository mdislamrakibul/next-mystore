import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React, { useContext, useEffect, useState } from 'react';
import baseUrl from '../helpers/baseUrl';
import { errorMsg, successMsg } from '../helpers/Toastify';
import { DataContext } from '../store/GlobalState';
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { state, dispatch } = useContext(DataContext)
  const { auth } = state
  const cookie = parseCookies()
  const handleClick = async (e) => {
    e.preventDefault()
    const res = await fetch(`${baseUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const res2 = await res.json()
    if (!res2.status) {
      errorMsg(res2.message)
    } else {
      successMsg(res2.message)
      Cookies.set('token', res2.data.token)
      Cookies.set('user', res2.data.user)
      dispatch({
        type: "AUTH",
        payload: {
          token: res2.data.token,
          user: res2.data.user
        }
      })
      setEmail("")
      setPassword("")
      router.push('/profile')
    }

  }
  const reset = async (e) => {
    e.preventDefault()
    setEmail("")
    setPassword("")
  }

  useEffect(() => {
    if (cookie.token && cookie.user) {
      router.push('/')
    }
  }, [cookie.token, cookie.user])

  return (
    <>
      <div className='row'>
        <div className='col-md-4 offset-md-4'>
          <div className="card">
            <div className="card-header">
              <h4>LOGIN</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="mb-3 row">
                    <label htmlFor="email" className="col-sm-1 col-form-label">
                      <i className="fas fa-at"></i>
                    </label>
                    <div className="col-sm-11">
                      <div className="form-floating">
                        <input type="email" className="form-control" id="email" name="email"
                          onChange={(e) => { setEmail(e.target.value) }} value={email} placeholder="Email" />
                        <label>Email</label>
                      </div>

                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 row">
                    <label htmlFor="password" className="col-sm-1 col-form-label">
                      <i className="fas fa-key"></i>
                    </label>
                    <div className="col-sm-11">
                      <div className="form-floating">
                        <input type="password" className="form-control" id="password" name="password"
                          onChange={(e) => { setPassword(e.target.value) }} value={password} placeholder="Password" />
                        <label>Password</label>
                      </div>

                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6 text-end">
                    <button className="btn btn-sm btn-success" onClick={(e) => { handleClick(e) }}>
                      <i className="fas fa-sign-in-alt"></i>&nbsp;
                      Login
                    </button>
                  </div>
                  <div className="col-6 text-start">
                    <button className="btn btn-sm btn-danger" onClick={(e) => reset(e)}>
                      <i className="fas fa-sync"></i>&nbsp;
                      Reset
                    </button>
                  </div>
                </div>
                <br />

              </form>
            </div>
            <div className="card-footer text-muted">
              <Link href="/signup" >
                <a className="text-center" style={{ textDecoration: 'none', color: 'cornflowerblue' }}>
                  <h6>Don't have an account ?</h6>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login