import React from 'react'
import AdminSidebar from '../sidebar/AdminSidebar'

function AdminLayout({ children })
{
    return (
        <>
            <>
                <div className=''>
                    <div className="row">
                        <div className="col s3">
                            <AdminSidebar />
                        </div>
                        <div className="col s9">
                            {children}
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}

export default AdminLayout