import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ClientLayout from '../../components/layout/ClientLayout';
import baseUrl from '../../helpers/baseUrl';
const Product = ({ product }) =>
{
    const [routerId, setRouterId] = useState('')
    const router = useRouter()
    const [quantity, setQuantity] = useState(1)

    if (router.isFallback) {
        return (
            <h3>loading...</h3>
        )
    }

    return (
        <ClientLayout>
            <div>
                <div className='row'>
                    <div className='col s5'>
                        <img src={product.image} style={{ width: '100%' }} />

                    </div>
                    <div className='col s7'>
                        <h3>{product.name}</h3>
                        <span>_________________</span>
                        <div>
                            <i className="material-icons">star</i>
                            <i className="material-icons">star</i>
                            <i className="material-icons">star</i>
                            <i className="material-icons">star</i>
                            <i className="material-icons">star</i>
                            Reviews
                        </div>
                        <div>
                            <p>{product.description}</p>
                        </div>
                        <p className="left-align">
                            $&nbsp;{product.price}
                        </p>
                        <div>
                            Quantity 1
                        </div>
                        <input
                            type="number"
                            style={{ width: "400px", margin: "10px" }}
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            placeholder="Quantity"
                        />
                        <div>
                            <a className="waves-effect waves-light btn"><i className="material-icons left">add_shopping_cart</i>Add to cart</a>
                        </div>
                        <div>
                            {/* <ul className="collapsible">
                                <li>
                                    <div className="collapsible-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ display: 'flex', alignItems: 'center' }}>
                                            <i className="material-icons">filter_drama</i>
                                            First
                                        </span>
                                        <span><i className="material-icons">arrow_drop_down</i></span>
                                    </div>
                                    <div className="collapsible-body">
                                        <span>Lorem ipsum dolor sit amet.</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="collapsible-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ display: 'flex', alignItems: 'center' }}>
                                            <i className="material-icons">filter_drama</i>
                                            First
                                        </span>
                                        <span><i className="material-icons">arrow_drop_down</i></span>
                                    </div>
                                    <div className="collapsible-body">
                                        <span>Lorem ipsum dolor sit amet.</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="collapsible-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ display: 'flex', alignItems: 'center' }}>
                                            <i className="material-icons">filter_drama</i>
                                            First
                                        </span>
                                        <span><i className="material-icons">arrow_drop_down</i></span>
                                    </div>
                                    <div className="collapsible-body">
                                        <span>Lorem ipsum dolor sit amet.</span>
                                    </div>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout>

    )
}


// export async function getServerSideProps({ params: { id } })
// {
//     const res = await fetch(`http://localhost:3000/api/products/${id}`)
//     const product = await res.json()
//     return {
//         props: {
//             product: product.data
//         },
//     }
// }

export async function getStaticProps({ params: { id } })
{
    const res = await fetch(`${baseUrl}/api/products/${id}`)
    const product = await res.json()
    return {
        props: {
            product: product.data
        },
    }
}

export async function getStaticPaths()
{
    const res = await fetch(`${baseUrl}/api/products`)
    const prods = await res.json()

    const paths = prods.data.map((prod) => ({
        params: { id: prod._id },
    }))
    return { paths, fallback: false }
}
export default Product
