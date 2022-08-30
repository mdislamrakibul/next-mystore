import Cookies from 'js-cookie';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useContext, useEffect, useRef, useState } from 'react';
import Loading from '../components/Loading';
import { patchData, getData } from '../helpers/dataOps';
import { imageUpload } from '../helpers/imageUpload';
import { errorMsg, successMsg } from '../helpers/Toastify';
import valid from '../helpers/valid';
import { DataContext } from '../store/GlobalState';

const Profile = () => {
    const router = useRouter()
    const orderCard = useRef(null)
    const cookie = parseCookies()
    const user = cookie.user ? JSON.parse(cookie.user) : ""
    useEffect(() => {
        setIsLoading(true)
        if (user) {
            setData({ ...data, username: user.username, email: user.email })
            getData('user/basicInfoUpdate', cookie.token)
                .then(res => {
                    setIsLoading(false)
                    setBasicInfoData(res.data)
                })

        }
    }, [])

    const { state, dispatch } = useContext(DataContext)
    const { auth, notify, orders } = state

    const initialSate = {
        avatar: '',
        username: '',
        newPassword: '',
        cf_password: ''
    }
    const initialBasicInfoState = {
        firstname: '',
        lastname: '',
        phone: '',
        dob: '',
        address: '',
        gender: ''
        // address: "dafasdfasd",
        // dob: "2022-08-09",
        // firstname: "Md. Rakibul",
        // gender: "male",
        // lastname: "Islam",
        // phone: "8801676365335",
    }
    const [data, setData] = useState(initialSate)
    const [basicInfoData, setBasicInfoData] = useState(initialBasicInfoState)

    const [isLoading, setIsLoading] = useState(false)

    const { avatar, username, newPassword, cf_password } = data
    const { firstname, lastname, phone, dob, address, gender } = basicInfoData

    const changeAvatar = (e) => {
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
    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }
    const handleUpdateProfile = (e) => {
        e.preventDefault()
        if (!newPassword) {
            errorMsg('Fil both password field')
            return
        }
        if (newPassword) {
            const errMsg = valid(username, user.email, newPassword, cf_password)
            if (errMsg) {
                errorMsg(errMsg)
                setIsLoading(false)
                return
            }
            updatePassword()
        }

        if (avatar) updateUserInfo()
    }
    const updatePassword = async () => {

        setIsLoading(true)
        patchData('user/resetPassword', { newPassword, username }, cookie.token)
            .then(res => {
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

    const updateUserInfo = async () => {
        let media;
        setIsLoading(true)
        if (avatar) media = await imageUpload([avatar])
        patchData('user',
            { avatar: avatar ? media[0].url : user.image }, cookie.token
        ).then(res => {
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


    const basicInfoChange = (e) => {
        const { name, value } = e.target
        setBasicInfoData({ ...basicInfoData, [name]: value })
    }

    const handleBasicInfo = async (e) => {
        e.preventDefault()
        // errorMsg("please select a gender")
        if (gender === '') {
            errorMsg("please select a gender")
            return
        }
        setIsLoading(true)
        patchData('user/basicInfoUpdate', { firstname, lastname, phone, dob, address, gender }, cookie.token)
            .then(res => {
                if (!res.status) {
                    setIsLoading(false)
                    errorMsg(res.message)
                    return
                }
                setIsLoading(false)
                successMsg(res.message)
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
                            <label htmlFor="newPassword">New Password</label>
                            <input type="password" name="newPassword" value={newPassword} className="form-control"
                                placeholder="Your new password" onChange={handleChange} id="newPassword" />
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
                        <h3 className='my-4'>Basic Information</h3>
                        <hr />
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="firstname" className="form-label">FirstName</label>
                                <input type="text" className="form-control" id="firstname" name="firstname" value={firstname} onChange={basicInfoChange} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="lastname" className="form-label">LastName</label>
                                <input type="text" className="form-control" id="lastname" name="lastname" value={lastname} onChange={basicInfoChange} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input type="text" className="form-control" id="phone" name="phone" value={phone} onChange={basicInfoChange} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="dob" className="form-label">DOB</label>
                                <input type="date" className="form-control" id="dob" name="dob" value={dob} onChange={basicInfoChange} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="address" className="form-label">Address</label>
                                <textarea type="text" className="form-control" id="address" name="address" placeholder="1234 Main St" value={address} onChange={basicInfoChange}>

                                </textarea>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="gender" className="form-label">Gender</label>
                                <select id="gender" className="form-select" name='gender' value={gender} onChange={basicInfoChange}>
                                    <option value="">Choose...</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div className="col-md-12" style={{ textAlign: 'end' }}>
                                <button className="btn btn-success btn-sm" onClick={(e) => handleBasicInfo(e)}>
                                    <i className="fas fa-user-edit"></i>&nbsp;
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}


export async function getServerSideProps(ctx) {
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




export default Profile