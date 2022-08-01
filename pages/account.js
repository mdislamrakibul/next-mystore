import { parseCookies } from 'nookies'
import { useContext, useEffect, useRef } from 'react'
import UserRoles from '../components/UserRoles'
import { DataContext } from '../store/GlobalState'
const Account = ({ orders }) =>
{
    const orderCard = useRef(null)
    const cookie = parseCookies()
    const user = cookie.user ? JSON.parse(cookie.user) : ""

    const { state, dispatch } = useContext(DataContext)
    const { auth, notify } = state

    console.log(auth);
    useEffect(() =>
    {
    }, [])
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

    return (
        <div className='container'>
            <br />
            <div className="row" style={{ backgroundColor: '#ffebee', borderRadius: '10px', padding: '10px' }} >
                <div className="col s3">
                    <div>
                        {user?.image && <img src={user?.image} alt={user?.username} width={'150px'} height={'auto'} />}

                        <br />
                        <h6>Name : <b>{user?.username}</b></h6>
                        <h6>Email : {user?.email}</h6>
                    </div>
                </div>

                <div className="col s9">
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
                <div className='col s12'>
                    {user?.role === 'root'
                        && <UserRoles />
                    }
                </div>
            </div>
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