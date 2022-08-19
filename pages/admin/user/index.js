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


export default UserManagement