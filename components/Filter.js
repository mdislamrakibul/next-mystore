import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import filterSearch from '../helpers/filterSearch';

const Filter = ({ state }) =>
{
    const [title, setTitle] = useState('')
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [category, setCategory] = useState('')

    const router = useRouter()

    const { categories } = state

    const handleCategory = (e) =>
    {
        setCategory(e.target.value)
        filterSearch({ router, category: e.target.value })
    }

    const handleSort = (e) =>
    {
        setSort(e.target.value)
        filterSearch({ router, sort: e.target.value })
    }

    useEffect(() =>
    {
        filterSearch({ router, search: search ? search : 'all' })
    }, [search])


    return (
        <div className="input-group my-2">
            <div className=" col-md-2  ">
                <select className="form-control custom-select text-capitalize"
                    value={category} onChange={handleCategory}>

                    <option value="all">All Products</option>

                    {
                        categories.map(item => (
                            <option key={item._id} value={item._id}>{item.name}</option>
                        ))
                    }
                </select>
            </div>

            <div className=" col-md-8 ">
                <input type="text" className="form-control" list="title_product" placeholder='Search ...'
                    value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            <div className="col-md-2 ">
                <select className="form-control custom-select text-capitalize"
                    value={sort} onChange={handleSort}>
                    <option value="-createdAt">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="-sold">Best sales</option>
                    <option value="-price">Price: High-Low</option>
                    <option value="price">Price: Low-High</option>

                </select>
            </div>


        </div>
    )
}

export default Filter