/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import Head from 'next/head';
import React from 'react';
import Navbar from '../navbar/Navbar';
const Layout = ({ children }) =>
{
    return (
        <>
            <Head>

                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
                <link rel="stylesheet" href="/style.css" />
            </Head>
            <Navbar />
            {children}
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            <script src="/script.js"></script>
        </>
    )
}

export default Layout