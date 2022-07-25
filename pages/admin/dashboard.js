import { parseCookies } from 'nookies';
import React from 'react';
import AdminLayout from '../../components/layout/AdminLayout';

const Dashboard = () =>
{
    return (
        <AdminLayout>
            Dashboard
        </AdminLayout>
    )
}

export async function getServerSideProps(ctx)
{
    const { user, token } = parseCookies(ctx)
    if (!token && !user) {
        const { res } = ctx
        res.writeHead(302, { Location: "/" })
        res.end()
    }
    return {
        props: {
            user: user ? JSON.parse(user) : {}
        }
    }

}
export default Dashboard