import Head from 'next/head';
import Modal from './Modal';
import NavBar from "./Navbar";

const layout = ({ children }) =>
{


    return (
        <>
            <Head>

                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet"></link>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" ></link>
                <link rel="stylesheet" href="/style.css" />
            </Head>
            <body className="d-flex flex-column h-100">

                <NavBar />
                <Modal />
                <main className="flex-shrink-0">
                    <div className="container">
                        <div className='row'>
                            <div className='col-md-12'>
                                {children}
                            </div>
                        </div>
                    </div>
                </main>
                {/* <Footer /> */}
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" ></script>
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        </>
    )
}


export default layout