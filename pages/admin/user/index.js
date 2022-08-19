import { parseCookies } from 'nookies';
import React from 'react';
import UserRoles from '../../../components/UserRoles';

function UserManagement()
{

    const { token, user } = parseCookies()

    return (
        <>
            <div className='row'>
                <div className='col-md-12'>
                    {user?.role !== 'user'
                        && <UserRoles />
                    }
                </div>
            </div>
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

export default UserManagement