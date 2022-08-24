import Head from 'next/head';
import React from 'react';
import Modal from '../Modal';
import NavBar from '../Navbar';
import Sidebar from './component/Sidebar';

function AdminLayout({ children })
{
    return (
        <>
            <Head>

                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet"></link>
                {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" /> */}
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" ></link>
                <link rel="stylesheet" href="/style.css" />
            </Head>
            <NavBar />
            <Modal />
            <div className='container' >
                <div className='row'>
                    <div className='col-md-3'>
                        <Sidebar />
                    </div>
                    <div className='col-md-9'>
                        {children}
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
            {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script> */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" ></script>
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

        </>
    )
}

export default AdminLayout