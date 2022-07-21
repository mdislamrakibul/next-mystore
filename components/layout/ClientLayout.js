import React from 'react';
import ClientSidebar from '../sidebar/ClientSidebar';
function ClientLayout({ children })
{
    return (
        <>
            <div className=''>
                <div className="row">
                    <div className="col s3">
                        <ClientSidebar />
                    </div>
                    <div className="col s9">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClientLayout