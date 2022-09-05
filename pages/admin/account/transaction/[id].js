import Head from 'next/head';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React, { useContext, useEffect, useState } from 'react'
import Loading from '../../../../components/Loading';
import { DataContext } from '../../../../store/GlobalState';
import TransactionDetails from './transactionDetails';

function TransactionID() {
    const { state, dispatch } = useContext(DataContext)
    const { token, user } = parseCookies()
    const { onlinePay } = state

    const router = useRouter()

    const [payDetail, setPayDetail] = useState([])

    useEffect(() => {
        const newArr = onlinePay.filter(onlinePay => onlinePay._id === router.query.id)
        setPayDetail(newArr)
    }, [onlinePay])

    if (!user) return null;
    return (
        <div className="my-3">
            <Head>
                <title>Transaction Details</title>
            </Head>

            <div className='container'>
                {!payDetail.length && <Loading />}
                <div>
                    <button className="btn btn-sm btn-danger" onClick={() => router.back()}>
                        <i className="fas fa-long-arrow-alt-left" aria-hidden="true"></i> Go Back
                    </button>
                </div>
                <TransactionDetails transactionDetail={payDetail} state={state} dispatch={dispatch} />
            </div>
        </div>
    )
}

export default TransactionID