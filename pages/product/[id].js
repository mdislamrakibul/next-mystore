import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { useContext, useRef, useState } from 'react'
import baseUrl from '../../helpers/baseUrl'
import { errorMsg } from '../../helpers/Toastify'
import { addToCart } from '../../store/Actions'
import { DataContext } from '../../store/GlobalState'
const Product = ({ product }) => {
  const [quantity, setQuantity] = useState(1)
  const [tab, setTab] = useState(0)
  const router = useRouter()
  const modalRef = useRef(null)
  const cookie = parseCookies()

  const { state, dispatch } = useContext(DataContext)
  const { cart } = state


  const user = cookie.user ? JSON.parse(cookie.user) : ""
  const isActive = (index) => {
    if (tab === index) return " active";
    return ""
  }

  if (router.isFallback) {
    return (
      <h3>loading...</h3>
    )
  }
  const addToCartHandleClick = (product, cart) => {

    if (product.inStock === 0) {
      errorMsg(`${product.title} is out of stock`)
      return
    }
    const check = cart.length && cart.find(item => item._id === product._id)

    if (check) {
      errorMsg(`${product.title} is already in your cart`)
      return
    }
    dispatch(addToCart(product, cart))
  }
  return (
    <>
      <Head>
        <title>Detail Product</title>
      </Head>
      <br />
      <div className='container'>
        <Link href="/">
          <a className="btn btn-sm btn-warning my-3 px-4"  >
            Back &nbsp;<i className="fas fa-hand-point-left"></i>
          </a>
        </Link>
        <div className='row'>
          <div className='col-md-5'>
            <img src={product.images[tab].url} alt={product.title}
              className="d-block img-thumbnail rounded w-100"
              style={{ height: '300px' }} />
            <br />

            <div style={{ cursor: 'pointer' }} >
              {product.images.map((img, index) => (
                <img key={index} src={img.url} alt={img.url}
                  className={`img-thumbnail ${isActive(index)}`}
                  style={{ height: '80px', width: '20%', marginRight: '10px' }}
                  onClick={() => setTab(index)} />
              ))}

            </div>
          </div>
          <div className='col-md-7'>
            <div className='d-flex'>
              <img className='img-thumbnail' src={product.image} alt={product.title} style={{ height: '80px', width: '20%', marginRight: '10px' }} />
              <h2 className="text-uppercase">{product.title}</h2>
            </div>
            <br />
            <h5 className="text-danger">Price : ${product.price}</h5>

            <div className="d-flex justify-content-between">
              {
                product.inStock > 0
                  ? <h6 className="text-danger">In Stock: {product.inStock}</h6>
                  : <h6 className="text-danger">Out Stock</h6>
              }

              <h6 className="text-danger">Sold: {product.sold}</h6>
            </div>
            <br />
            <div className="my-2">
              <h5>Description</h5>
              <hr />
              {product.description}
            </div>
            <br />
            <div className="my-2">
              <h5>Content</h5>
              <hr />
              {product.content}
            </div>
            <br />
            <div style={{
              display: 'flex', gap: '10px'
            }}>

              <button className="btn btn-sm btn-success my-3 px-4 justify-content-between"
                onClick={() => addToCartHandleClick(product, cart)} disabled={product.inStock ? false : true}>
                Buy &nbsp;<i className="fas fa-cart-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${baseUrl}/api/products/${id}`)
  const data = await res.json()
  if (data.status) {
    return { props: { product: data.data } }
  }
  return {
    props: { product: {} }
  }
}
// export async function getStaticProps({ params: { id } })
// {
//   const res = await fetch(`${baseUrl}/api/products/${id}`)
//   const data = await res.json()
//   return {
//     props: { product: data }
//   }
// }

// export async function getStaticPaths()
// {
//   return {
//     paths: [
//       { params: { id: "5f0f502b9cb9363990f3de6c" } }
//     ],
//     fallback: true
//   }
// }

export default Product