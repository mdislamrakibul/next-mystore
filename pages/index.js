
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Filter from '../components/Filter';
import baseUrl from '../helpers/baseUrl';
import filterSearch from '../helpers/filterSearch';
import ProductItem from './product/ProductItem';
const Home = ({ products, result }) =>
{
  const router = useRouter();
  const [page, setPage] = useState(1)
  const handleLoadMore = () =>
  {
    setPage(page + 1)
    filterSearch({ router, page: page + 1 })
  }
  useEffect(() =>
  {
    if (Object.keys(router.query).length === 0) setPage(1)
    else setPage(Number(router.query.page))
  }, [router.query])
  const state = []
  return (
    <div>
      <Head>
        <title>My Store</title>
      </Head>

      <Filter />

      <div className="row">
        {products.length < 1 ? 'No Products Found' : products.map(product => <ProductItem key={product._id} product={product} />)}
      </div >
      {
        result < page * 4 ? ""
          : <div className='text-center'>
            <button className="btn btn-outline-info btn-sm "
              onClick={handleLoadMore}>
              Load more
            </button>
          </div>
      }
    </div>
  )
}

export async function getServerSideProps({ query })
{
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