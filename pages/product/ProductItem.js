import Link from 'next/link';
import React, { useContext } from 'react';
import { errorMsg } from '../../helpers/Toastify';
import { addToCart } from '../../store/Actions';
import { DataContext } from '../../store/GlobalState';
const ProductItem = ({ product }) =>
{
    const { state, dispatch } = useContext(DataContext)
    const { cart } = state
    const addToCartHandleClick = (product, cart) =>
    {

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
        <div className="col-md-2" key={product?._id} >
            <div className="card" style={{ width: '18rem' }}>
                <img src={product.image} className="card-img-top" alt={product.title} />
                <div className="card-body">
                    <h5 className="card-title">
                        <Link href={'/product/[id]'} as={`/product/${product?._id}`}>
                            <a style={{ textDecoration: 'none', color: 'lightseagreen' }}>{product?.title}</a>
                        </Link>
                    </h5>
                    <p className="card-text">
                        {product.description.length > 90 ? product.description.substring(0, 90) + ' ...' : product.description}
                    </p>
                    <span> Price: ${product?.price}</span>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p>{product.inStock > 0 ? 'In Stock: ' + product?.inStock : 'Out Stock'}</p>
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
                        onClick={() => addToCartHandleClick(product, cart)} disabled={product.inStock ? false : true}>
                        <i className="fas fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div >
    )
}

export default ProductItem