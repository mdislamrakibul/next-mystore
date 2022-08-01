
import baseUrl from '../helpers/baseUrl';
import ProductItem from './product/ProductItem';
const Home = ({ products, result }) =>
{

  return (
    <div>
      <div className="row">
        {products.length < 1 ? 'No Products Found' : products.map(product => <ProductItem key={product._id} product={product} />)}
      </div >
    </div>
  )
}

export async function getServerSideProps()
{
  const res = await fetch(`${baseUrl}/api/products`)
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