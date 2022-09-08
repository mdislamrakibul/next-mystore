import Link from 'next/link';
import React, { useContext } from 'react';
import { errorMsg } from '../../helpers/Toastify';
import { addToCart } from '../../store/Actions';
import { DataContext } from '../../store/GlobalState';
import Cookie from 'js-cookie';
const ProductItem = ({ product }) => {
    const { state, dispatch } = useContext(DataContext)
    const { cart } = state
    let image
    // const user = Cookie.get('user') ? JSON.parse(Cookie.get(user)) : {}
    const addToCartHandleClick = (product, cart) => {

        if (product?.inStock === 0) {
            errorMsg(`${product?.title} is out of stock`)
            return
        }
        const check = cart.length && cart.find(item => item._id === product?._id)

        if (check) {
            errorMsg(`${product?.title} is already in your cart`)
            return
        }
        dispatch(addToCart(product, cart))
    }
    return (
        <div className="col-md-3 col-lg-3 col-sm-3 mb-2" key={product?._id} >
            <div className="card" style={{ width: '19rem' }}>
                <img src={product?.image ? product?.image : 'https://res.cloudinary.com/x-gwkjs-8zn7m-3/image/upload/v1660200423/no-image-available_bitpsk.png'} className="card-img-top" alt={product?.title} />
                <div className="card-body">
                    <h5 className="card-title">
                        <Link href={'/product/[id]'} as={`/product/${product?._id}`}>
                            <a style={{ textDecoration: 'none', color: 'lightseagreen' }}>{product?.title}</a>
                        </Link>
                    </h5>
                    <p className="card-text">
                        {product?.description.length > 90 ? product?.description.substring(0, 90) + ' ...' : product?.description}
                    </p>
                    <span> Price: ${product?.price}</span>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p>{product?.inStock > 0 ? 'In Stock: ' + product?.inStock : 'Out Stock'}</p>
                        <p>Sold: {product?.sold}</p>
                    </div>
                </div>
                <div className="card-footer text-muted justify-content-between">
                    <Link href={'/product/[id]'} as={`/product/${product?._id}`}>
                        <a className="btn btn-sm btn-primary">
                            <i className="far fa-eye"></i>
                        </a>
                    </Link>
                    <button className="btn btn-sm btn-success"
                        onClick={() => addToCartHandleClick(product, cart)} disabled={product?.inStock ? false : true}>
                        <i className="fas fa-cart-plus"></i>
                    </button>

                </div>
            </div>
        </div >
    )
}

export default ProductItem