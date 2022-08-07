import Cookies from 'js-cookie';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useContext, useEffect, useRef, useState } from 'react';
import Loading from '../components/Loading';
import { patchData } from '../helpers/dataOps';
import { imageUpload } from '../helpers/imageUpload';
import { errorMsg, successMsg } from '../helpers/Toastify';
import valid from '../helpers/valid';
import { DataContext } from '../store/GlobalState';
const Account = ({ orders }) =>
{
    const router = useRouter()
    const orderCard = useRef(null)
    const cookie = parseCookies()
    const user = cookie.user ? JSON.parse(cookie.user) : ""
    console.log("🚀 ~ file: profile.js ~ line 18 ~ user", user)
    useEffect(() =>
    {
        if (user) {
            setData({ ...data, username: user.username, email: user.email })
        }
    }, [])

    const { state, dispatch } = useContext(DataContext)
    const { auth, notify } = state

    const initialSate = {
        avatar: '',
        username: '',
        password: '',
        cf_password: ''
    }
    const [data, setData] = useState(initialSate)
    const [isLoading, setIsLoading] = useState(false)
    const { avatar, username, password, cf_password } = data
    const OrderHistory = () =>
    {
        return (
            <ul className="collapsible" ref={orderCard}>

                {orders.map(item =>
                {
                    return (
                        <li key={item._id}>
                            <div className="collapsible-header"><i className="material-icons">folder</i>{item.createdAt}</div>
                            <div className="collapsible-body">
                                <h5>Total  ₹ {item.total}</h5>
                                {
                                    item.products.map(pitem =>
                                    {
                                        return <h6 key={pitem._id}>{pitem.product.name} X {pitem.quantity}</h6>
                                    })
                                }

                            </div>
                        </li>
                    )
                })}


            </ul>

        )
    }

    const changeAvatar = (e) =>
    {
        const file = e.target.files[0]
        if (!file) {
            errorMsg("Please select an image")
            return
        }

        if (file.size > 1024 * 1024) //1mb
        {
            errorMsg("Image size should be less than 1mb")
            return
        }

        if (file.type !== "image/jpeg" && file.type !== "image/png") {
            errorMsg("Image should be jpeg or png")
            return
        }

        setData({ ...data, avatar: file })
    }
    const handleChange = (e) =>
    {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }
    const handleUpdateProfile = (e) =>
    {
        e.preventDefault()
        if (password) {
            const errMsg = valid(username, user.email, password, cf_password)
            if (errMsg) {
                errorMsg(errMsg)
                setIsLoading(false)
                return
            }
            updatePassword()
        }

        if (avatar) updateUserInfo()
    }
    const updatePassword = async () =>
    {
        setIsLoading(true)
        patchData('user/resetPassword', { password, username }, cookie.token)
            .then(res =>
            {
                if (!res.status) {
                    setIsLoading(false)
                    errorMsg(res.message)
                    return
                }
                setIsLoading(false)
                successMsg(res.message)
                Cookies.set('user', res.data)
            })
    }

    const updateUserInfo = async () =>
    {
        let media;
        setIsLoading(true)
        if (avatar) media = await imageUpload([avatar])
        patchData('user',
            { avatar: avatar ? media[0].url : user.image }, cookie.token
        ).then(res =>
        {
            setIsLoading(false)
            if (!res.status) {
                errorMsg(res.message)
                return
            }
            successMsg(res.message)
            Cookies.set('user', res.data)
            router.push('/profile')
        })
    }
    return (
        <div className='container profile_page'>
            {isLoading && <Loading />}
            <Head>
                <title>Profile</title>
            </Head>
            <br />
            <section className="row text-secondary my-3">
                <div className='row'>
                    <div className='col-md-4'>
                        {/*avatar ? URL.createObjectURL(avatar) :  */}
                        <div className="avatar mb-3">
                            {
                                user
                                && <img src={avatar ? URL.createObjectURL(avatar) : user?.image} alt={user?.username} />
                                // : <img src="https://res.cloudinary.com/x-gwkjs-8zn7m-3/image/upload/v1658488363/user_icon_png_1449226_jbw7dr.png" alt="Avatar" />
                            }
                            <span>
                                <i className="fas fa-camera"></i>
                                <p>Change</p>
                                <input type="file" name="file" id="file_up"
                                    accept="image/*" onChange={(e) => changeAvatar(e)} />
                            </span>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" value={username} className="form-control"
                                placeholder="Your username" onChange={handleChange} id="username" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" defaultValue={user.email}
                                className="form-control" disabled={true} id="email" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password">New Password</label>
                            <input type="password" name="password" value={password} className="form-control"
                                placeholder="Your new password" onChange={handleChange} id="password" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="cf_password">Confirm New Password</label>
                            <input type="password" name="cf_password" value={cf_password} className="form-control"
                                placeholder="Confirm new password" onChange={handleChange} id="cf_password" />
                        </div>

                        <button className="btn btn-info btn-sm" disabled={isLoading}
                            onClick={handleUpdateProfile}>
                            <i className="far fa-check-circle"></i>&nbsp;Update
                        </button>
                        {/* {user?.image && <img src={user?.image} alt={user?.username} width={'150px'} height={'auto'} />} */}
                    </div>
                    <div className='col-md-8'>
                        ss
                    </div>
                </div>
            </section>
            {/* <div className="row" style={{ backgroundColor: 'lightgray', borderRadius: '10px', padding: '10px' }} >
                <div className="col-md-4">
                    <div>
                        {user?.image && <img src={user?.image} alt={user?.username} width={'150px'} height={'auto'} />}

                        <br />
                        <h6>Name : <b>{user?.username}</b></h6>
                        <h6>Email : {user?.email}</h6>
                    </div>
                </div>

                <div className="col-md-8">
                    <div>
                        Phone : <b>01234567890</b><br />
                        Address : <b>Commercial Cove, 52, Gulshan -1, Dhaka</b><br />
                        BirthDay : <b>01-01-1970</b><br />
                        Gender : <b>Male</b><br />
                        Username : <b>{user?.username}</b><br />
                        Password : <b>**********</b><br />
                    </div>
                    <div>

                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                    {user?.role === 'root'
                        && <UserRoles />
                    }
                </div>
            </div> */}
        </div >
    )
}


export async function getServerSideProps(ctx)
{
    const { token } = parseCookies(ctx)
    if (!token) {
        const { res } = ctx
        res.writeHead(302, { Location: "/login" })
        res.end()
    }

    // const res = await fetch(`${baseUrl}/api/orders`, {
    //     headers: {
    //         "Authorization": token
    //     }
    // })
    // const res2 = await res.json()
    // console.log(res2)

    return {
        props: { orders: [] }
    }
}




export default Account