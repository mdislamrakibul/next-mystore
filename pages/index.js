import Link from 'next/link'
import baseUrl from '../helpers/baseUrl'

const Home = ({ products, result }) =>
{


  const productList = products.map(product =>
  {
    return (
      <>
        <div className="col s2" key={product._id}>
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img src={product.image} style={{ width: '300px' }} />
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4">{product.title}<i class="material-icons right">more_vert</i></span>
              <p> ₹  {product.price}</p>
            </div>
            <div className="card-action">
              <Link href={'/product/[id]'} as={`/product/${product._id}`}><a>View Product</a></Link>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">{product.title}<i class="material-icons right">close</i></span>
              <p>{product.description}</p>
            </div>
          </div>
        </div>

      </>

    )
  })

  // console.log(products)
  return (
    <div className="row">
      {productList}
    </div >
  )
}


export async function getServerSideProps()
{
  const res = await (await fetch(`${baseUrl}/api/products`)).json()
  if (res.status) {
    const product = await res.data

    return {
      props: {
        products: product,
        result: res.total
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