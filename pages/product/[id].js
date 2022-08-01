import cookie2 from 'js-cookie'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { useContext, useEffect, useRef, useState } from 'react'
import baseUrl from '../../helpers/baseUrl'
import { addToCart } from '../../store/Actions'
import { DataContext } from '../../store/GlobalState'
const Product = ({ product }) =>
{
  const [quantity, setQuantity] = useState(1)
  const [tab, setTab] = useState(0)
  const router = useRouter()
  const modalRef = useRef(null)
  const cookie = parseCookies()

  const { state, dispatch } = useContext(DataContext)
  const { cart } = state


  const user = cookie.user ? JSON.parse(cookie.user) : ""
  const isActive = (index) =>
  {
    if (tab === index) return " active";
    return ""
  }


  useEffect(() =>
  {
  }, [])
  if (router.isFallback) {
    return (
      <h3>loading...</h3>
    )
  }

  const getModal = () =>
  {
    return (
      <div id="modal1" className="modal" ref={modalRef}>
        <div className="modal-content">
          <h4>{product.name}</h4>
          <p>Are you sure you want to delete this</p>
        </div>
        <div className="modal-footer">
          <button className="btn waves-effect waves-light #1565c0 blue darken-3">
            cancel
          </button>
          <button className="btn waves-effect waves-light #c62828 red darken-3"
            onClick={() => deleteProduct()}
          >
            Yes
          </button>
        </div>
      </div>

    )
  }

  const deleteProduct = async () =>
  {
    const res = await fetch(`${baseUrl}/api/product/${product._id}`, {
      method: "DELETE"
    })
    await res.json()
    router.push('/')
  }

  const AddToCart = async () =>
  {
    const res = await fetch(`${baseUrl}/api/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": cookie.token
      },
      body: JSON.stringify({
        quantity,
        productId: product._id
      })
    })
    const res2 = await res.json()
    if (res2.error) {
      cookie2.remove("user")
      cookie2.remove("token")
      router.push('/login')
    }

  }

  const addToCartHandleClick = (product, cart) =>
  {

    if (product.inStock === 0) {
      return
    }
    const check = cart.length && cart.find(item => item._id === product._id)

    if (check) {
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
      <div className='row container'>
        <div className='col s5'>
          <img src={product.images[tab].url} alt={product.title}
            className="d-block img-thumbnail"
            style={{ height: '300px', display: 'block', marginTop: '10px', }} />
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
        <div className='col s7'>
          <h2 className="text-uppercase">{product.title}</h2>
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
          <button type="button" className="btn d-block my-3 px-5 justify-content-between"
            onClick={() => addToCartHandleClick(product, cart)} disabled={product.inStock ? false : true}>
            Buy &nbsp;<i class="material-icons">add_shopping_cart</i>
          </button>
        </div>
      </div>
      {/* <button className="btn waves-effect waves-light #1565c0 blue darken-3"
        onClick={() => AddToCart()}
      >Add
        <i className="material-icons right">add</i>
      </button>
      {getModal()} */}
    </>

  )
}

export async function getServerSideProps({ params: { id } })
{
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