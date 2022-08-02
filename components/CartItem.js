import Link from 'next/link';
import React from 'react';
import { decrease, increase } from '../store/Actions';

const CartItem = ({ item, dispatch, cart }) =>
{
    return (
        <tr>
            <td style={{ width: '150px', overflow: 'hidden' }}>
                <img src={item.image} alt={item.images}
                    className="img-thumbnail w-100"
                    style={{ minWidth: '80px', height: '80px' }} />
            </td>
            <td style={{ width: '150px' }} className="align-middle" >
                <h6 className="text-capitalize text-secondary">
                    <Link href={`/product/${item._id}`}>
                        <a>{item.title}</a>
                    </Link>
                </h6>
                {
                    item.inStock > 0
                        ? <p className="mb-1 ">In Stock: {item.inStock}</p>
                        : <p className="mb-1 text-danger">Out Stock</p>
                }
            </td>

            <td className="align-middle" style={{ minWidth: '120px' }}>
                <button className="btn btn-sm btn-danger"
                    onClick={() => dispatch(decrease(cart, item._id))}
                    disabled={item.quantity === 1 ? true : false} > - </button>

                <span className="px-3">{item.quantity}</span>

                <button className="btn btn-sm btn-success"
                    onClick={() => dispatch(increase(cart, item._id))}
                    disabled={item.quantity === item.inStock ? true : false} > + </button>
            </td>
            <td className="align-middle">${item.price}</td>
            <td className="align-middle">${item.quantity * item.price}</td>
            <td className="align-middle" style={{ minWidth: '50px', cursor: 'pointer' }}>
                <button class="btn btn-sm btn-danger" onClick={() => dispatch({
                    type: 'ADD_MODAL',
                    payload: [{ data: cart, id: item._id, title: item.title, type: 'ADD_TO_CART' }]
                })} data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i className="material-icons" aria-hidden="true"
                        style={{ fontSize: '18px' }}
                    >clear</i>
                </button>
            </td>
        </tr>
    )
}

export default CartItem