import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
import baseUrl from '../helpers/baseUrl';
import { errorMsg, successMsg } from '../helpers/Toastify';

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
      errorMsg(res2.message)
    } else {
      successMsg(res2.message)
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
      <div className='row'>
        <div className='col-md-4 offset-md-4'>
          <div class="card">
            <div class="card-header">
              <h4>JOIN</h4>
            </div>
            <div class="card-body">
              <form>
                <div className="row">
                  <div class="mb-3 row">
                    <label for="username" class="col-sm-1 col-form-label"><i class="fas fa-user-circle"></i></label>
                    <div class="col-sm-11">
                      <div class="form-floating">
                        <input type="text" class="form-control" id="username" name="username"
                          onChange={(e) => { setUsername(e.target.value) }} value={username} placeholder="Username" />
                        <label for="username" class="form-label">Username</label>
                      </div>

                    </div>
                  </div>
                </div>


                <div className="row">
                  <div class="mb-3 row">
                    <label for="email" class="col-sm-1 col-form-label">
                      <i class="fas fa-at"></i>
                    </label>
                    <div class="col-sm-11">
                      <div class="form-floating">
                        <input type="email" class="form-control" id="email" name="email"
                          onChange={(e) => { setEmail(e.target.value) }} value={email} placeholder="Email" />
                        <label>Email</label>
                      </div>

                    </div>
                  </div>
                </div>


                <div className="row">

                  <div class="mb-3 row">
                    <label for="password" class="col-sm-1 col-form-label">
                      <i class="fas fa-key"></i>
                    </label>
                    <div class="col-sm-11">
                      <div class="form-floating">
                        <input type="email" class="form-control" id="password" name="password"
                          onChange={(e) => { setPassword(e.target.value) }} value={password} placeholder="Password" />
                        <label>Password</label>
                      </div>

                    </div>
                  </div>
                </div>


                <div className="row">
                  <div className="col-6 text-end">
                    <button className="btn btn-sm btn-success" onClick={(e) => { handleClick(e) }}>
                      <i class="fas fa-user-plus"></i>&nbsp;
                      Join
                    </button>
                  </div>
                  <div className="col-6 text-start">
                    <button className="btn btn-sm btn-danger" onClick={(e) => reset(e)}>
                      <i class="fas fa-sync"></i>&nbsp;
                      Reset
                    </button>
                  </div>
                </div>
                <br />

              </form>
            </div>
            <div class="card-footer text-muted">
              <Link href="/login" >
                <a className="text-center" style={{ textDecoration: 'none', color: 'cornflowerblue' }}>
                  <h6>Already have an account ?</h6>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp