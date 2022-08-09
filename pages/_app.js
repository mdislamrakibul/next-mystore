import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Layout from '../components/Layout';
import { DataProvider } from '../store/GlobalState';
import AdminLayout from './../components/admin/AdminLayout';
function MyApp({ Component, pageProps, router })
{
  const adminPanel = router.route.startsWith('/admin') ? true : false
  console.log("🚀 ~ file: _app.js ~ line 9 ~ const", adminPanel)
  const getLayout =
    adminPanel ? ((page) => <AdminLayout children={page} />)
      : ((page) => <Layout children={page} />);

  return (
    <>
      <DataProvider>
        {getLayout(<Component {...pageProps} />, pageProps)}
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable={false}
          pauseOnVisibilityChange
          closeOnClick
          pauseOnHover
        />
      </DataProvider>
    </>
  )
}


export default MyApp