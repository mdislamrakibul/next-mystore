import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
import baseUrl from '../helpers/baseUrl';

const SignUp = () =>
{
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const cookie = parseCookies()

  const handleClick = async (e) =>
  {
    e.preventDefault()
    const res = await fetch(`${baseUrl}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })

    const res2 = await res.json()
    if (!res2.status) {
    } else {
      setUsername("")
      setEmail("")
      setPassword("")
      router.push('/login')
    }
  }

  const reset = async (e) =>
  {
    e.preventDefault()
    setUsername("")
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
        <h4>JOIN</h4>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">account_circle</i>
                <input id="username" type="text" className="validate" name="username"
                  onChange={(e) => { setUsername(e.target.value) }} value={username}
                />
                <label htmlFor="username">User Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input id="email" type="email" className="validate" name="email"
                  onChange={(e) => { setEmail(e.target.value) }} value={email} />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">keyboard_hide</i>
                <input id="password" type="password" className="validate" name="password"
                  onChange={(e) => { setPassword(e.target.value) }} value={password} />
                <label htmlFor="password">Password</label>
              </div>
            </div>

            <div className="row">
              <div className=" col s12">
                <button className="waves-effect waves-light btn" onClick={(e) => handleClick(e)}>
                  <i className="material-icons right">send</i>Join
                </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="waves-effect waves-light btn #ef5350 red lighten-1" onClick={(e) => reset(e)}><i className="material-icons right">refresh</i>Reset</button>
              </div>
            </div>
            <Link href="/auth/login">
              <a><h6>Already have an account ?</h6>
              </a>
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp