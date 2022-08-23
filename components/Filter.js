import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { DataContext } from '../store/GlobalState';

const Filter = () =>
{
    const [title, setTitle] = useState('')
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [category, setCategory] = useState('')

    const router = useRouter()

    const { state, dispatch } = useContext(DataContext)
    const { categories } = state
    return (
        <div className='input-group'>
            <select value={categories} class="form-select">
                <option value="all">--Select--</option>
                {categories.map(x => (
                    <option value={x._id}>{x.name}</option>

                ))}
            </select>
            <form>
                <input type="text" className='form-control' list='title_product' value={search.toLowerCase()} />
                <datalist id='title_product'>.
                    <option value="name">Title</option>
                </datalist>
                <button className='btn btn-sm btn-info' style={{ top: '0', right: '0', visibility: 'hidden' }}>
                    <i class="fas fa-search"></i>
                </button>
            </form>
        </div>
    )
}

export default Filter