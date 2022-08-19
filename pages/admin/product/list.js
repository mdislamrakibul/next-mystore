import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import baseUrl from '../../../helpers/baseUrl';

import XMLHttpRequest from 'xhr2';
import filterSearch from '../../../helpers/filterSearch';
import { DataContext } from '../../../store/GlobalState';
function ProductList({ products, result })
{
    const { state, dispatch } = useContext(DataContext)
    const { categories } = state
    console.log("🚀 ~ file: list.js ~ line 12 ~ categories", categories)
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

    function checkImage(url)
    {
        // axios.get(url)
        //     .then(res =>
        //     {
        //         return true
        //     }).catch(error =>
        //     {
        //         return false
        //     })
        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.send();
        request.onload = function ()
        {
            console.log(request);
            if (request.status == 200) {
                console.log("image exists");
                return true
            } else {
                console.log("image doesn't exist");
                return false
            }
        }
    }

    return (
        <div>
            <h5>Product List</h5>
            <hr />
            <table className='table table-responsive table-hover'>
                <thead>
                    <tr>
                        <th>#Id</th>
                        <th>Title</th>
                        {/* <th>Category</th> */}
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.title}</td>
                            {/* <td>{categories.length > 0 ? categories.find(cat => String(cat._id) === String(product.category)).name : 'No Category Found'}</td> */}
                            <td>
                                <img src={product.image} alt={product.title} className="img-thumbnail"
                                    style={{ minWidth: '30px', height: '30px' }} />
                            </td>
                            <td style={{ gap: '10px', display: 'flex' }}>
                                <button className='btn btn-sm btn-info'>
                                    <i className="far fa-eye"></i>
                                </button>
                                <button className='btn btn-sm btn-danger'>
                                    <i className="far fa-trash-alt"></i>
                                </button>
                                <button className='btn btn-sm btn-primary'>
                                    <i className="fas fa-pen-nib"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >
            <br />
            {
                result < page * 4 ? ""
                    : <div className='text-center'>
                        <button className="btn btn-outline-info btn-sm "
                            onClick={handleLoadMore}>
                            Load more
                        </button>
                    </div>
            }
        </div >
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

export default ProductList