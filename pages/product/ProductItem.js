import Link from 'next/link';
import React, { useContext } from 'react';
import { addToCart } from '../../store/Actions';
import { DataContext } from '../../store/GlobalState';
const ProductItem = ({ product }) =>
{
    const { state, dispatch } = useContext(DataContext)
    const { cart } = state
    const addToCartHandleClick = (product, cart) =>
    {

        if (product.inStock === 0) {
            M.toast({ html: 'This product is out of stock.', classes: "red" })
            return
        }
        const check = cart.length && cart.find(item => item._id === product._id)

        if (check) {
            M.toast({ html: `${product.title} already exists.`, classes: "red" })
            return
        }
        dispatch(addToCart(product, cart))
    }
    return (
        <div className="col s2" key={product?._id} >
            <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                    <img src={product?.image} style={{ width: '300px' }} />
                </div>
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">
                        <Link href={'/product/[id]'} as={`/product/${product?._id}`}><a>{product?.title}</a></Link>
                        <i class="material-icons right">more_vert</i>
                    </span>
                    <p> $ {product?.price}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p>{product.inStock > 0 ? 'In Stock: ' + product?.inStock : 'Out Stock'}</p>
                        <p>Sold: {product?.sold}</p>
                    </div>
                </div>
                <div className="card-action" style={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between' }}>
                    <Link href={'/product/[id]'} as={`/product/${product?._id}`}>
                        <a class="btn-floating btn-sm waves-effect waves-light blue pulse">
                            <i class="material-icons">remove_red_eye</i>
                        </a>
                    </Link>
                    <button class="btn-floating btn-sm waves-effect waves-light pulse green" onClick={() => addToCartHandleClick(product, cart)} disabled={product.inStock ? false : true}>
                        <a class="btn-floating btn-sm waves-effect waves-light pulse green">
                            <i class="material-icons">add_shopping_cart</i>
                        </a>
                    </button>
                </div>
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">{product?.title}<i class="material-icons right">close</i></span>
                    <p>{product?.description}</p>
                </div>
            </div>
        </div >
    )
}

export default ProductItem