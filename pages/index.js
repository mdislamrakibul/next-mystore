
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Filter from '../components/Filter';
import baseUrl from '../helpers/baseUrl';
import filterSearch from '../helpers/filterSearch';
import { DataContext } from '../store/GlobalState';
import ProductItem from './product/ProductItem';
const Home = ({ products, result }) => {
  const router = useRouter();
  const [page, setPage] = useState(1)
  const handleLoadMore = () => {
    setPage(page + 1)
    filterSearch({ router, page: page + 1 })
  }
  useEffect(() => {
    if (Object.keys(router.query).length === 0)
      setPage(1)

  }, [router.query])
  const { state, dispatch } = useContext(DataContext)
  return (
    <div>
      <Head>
        <title>My Store</title>
      </Head>

      <Filter state={state} />
      <div className="row">
        {
          products.length < 1
            ?
            <div className='col-md-12'>
              <div className="alert alert-info text-center" role="alert">
                <img src="https://res.cloudinary.com/x-gwkjs-8zn7m-3/image/upload/v1661326320/no-product-found-removebg-preview_hevwjv.png" />
              </div>
            </div>
            :
            products.map(product => <ProductItem key={product._id} product={product} />)
        }
      </div >
      {
        result < page * 4 ? ""
          : <div className='text-center my-5'>
            <button className="btn btn-outline-info btn-sm "
              onClick={handleLoadMore}>
              <i className="fas fa-spinner"></i>&nbsp;Load more
            </button>
          </div>
      }
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const page = query.page || 1
  const category = query.category || 'all'
  const sort = query.sort || ''
  const search = query.search || 'all'

  const res = await fetch(`${baseUrl}/api/products?limit=${page * 4}&category=${category}&sort=${sort}&title=${search}`)


  const data = await res.json()
  if (data.status) {
    const product = data.data

    return {
      props: {
        products: product,
        result: data.total
      }
    }
  }
  return {
    props: {
      products: [],
      result: 0
    }
  }

}

export default Home


//TODO: ORDER ::
//TODO: ORDER :: REJECT - USER (PENDING) + ADMIN (DONE)
//TODO: ORDER :: LIST - ADMIN (DONE)
//TODO: ORDER
//TODO: ORDER
//TODO: ORDER
//TODO: ORDER
//TODO: ORDER
//TODO: ORDER
//TODO: ORDER
//TODO: ORDER
