import React from 'react';
// import AdminLayout from './../../components/admin/AdminLayout';
import { parseCookies } from 'nookies';
function Dashboard()
{
    return (
        <>
            {/* <AdminLayout>
            </AdminLayout> */}
            <div>Dashboard</div>
        </>
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

export default Dashboard