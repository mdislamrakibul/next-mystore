import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React, { useContext, useEffect, useState } from 'react';
import baseUrl from '../helpers/baseUrl';
import { DataContext } from '../store/GlobalState';
const Login = () =>
{
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { state, dispatch } = useContext(DataContext)
  const { auth } = state
  const cookie = parseCookies()
  const handleClick = async (e) =>
  {
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
    } else {
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
      router.push('/account')
    }

  }
  const reset = async (e) =>
  {
    e.preventDefault()
    setEmail("")
    setPassword("")
  }

  useEffect(() =>
  {
    if (cookie.token && cookie.user) {
      router.push('/')
    }
  }, [cookie.token, cookie.user])

  return (
    <>
      <div className="container card authcard center-align">
        <h4>LOGIN</h4>
        <form>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">email</i>
              <input id="email" type="email" className="validate" name='email'
                onChange={(e) => { setEmail(e.target.value) }} value={email} />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">keyboard_hide</i>
              <input id="password" type="password" className="validate" name='password'
                onChange={(e) => { setPassword(e.target.value) }} value={password} />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <div className=" col s12">
              <button className="waves-effect waves-light #1565c0 blue btn" onClick={(e) => { handleClick(e) }}>
                <i className="material-icons right" >send</i>
                Login
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button className="waves-effect waves-light btn #ef5350 red lighten-1" onClick={(e) => reset(e)}>
                <i className="material-icons right">refresh</i>
                Reset
              </button>
            </div>
          </div>
          <Link href="/auth/signup"><a><h6>Dont have a account ?</h6></a></Link>
        </form>

      </div>
    </>
  )
}

export default Login