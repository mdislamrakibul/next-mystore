import Head from 'next/head'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { useContext, useEffect, useState } from 'react'
import Loading from '../../../components/Loading'
import OrderDetail from '../../../components/OrderDetail'
import { DataContext } from '../../../store/GlobalState'


const DetailOrder = () => {
    const { state, dispatch } = useContext(DataContext)
    const { token, user } = parseCookies()
    const { orders, auth } = state

    const router = useRouter()

    const [orderDetail, setOrderDetail] = useState([])

    useEffect(() => {
        const newArr = orders.filter(order => order._id === router.query.id)
        setOrderDetail(newArr)
    }, [orders])

    if (!user) return null;
    return (

        <div className="my-3">
            <Head>
                <title>Detail Orders</title>
            </Head>

            <div className='container'>
                {!orderDetail.length && <Loading />}
                <div>
                    <button className="btn btn-sm btn-danger" onClick={() => router.back()}>
                        <i className="fas fa-long-arrow-alt-left" aria-hidden="true"></i> Go Back
                    </button>
                </div>
                <OrderDetail orderDetail={orderDetail} state={state} dispatch={dispatch} />
            </div>
        </div>
    )
}

export default DetailOrder