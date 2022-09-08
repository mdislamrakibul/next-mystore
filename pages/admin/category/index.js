import Cookies from 'js-cookie';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import React, { useContext, useEffect, useState } from 'react';
import Loading from '../../../components/Loading';
import { getData, postData, putData } from '../../../helpers/dataOps';
import { errorMsg, successMsg } from '../../../helpers/Toastify';
import { updateItem } from '../../../store/Actions';
import { DataContext } from '../../../store/GlobalState';
function CategoryIndex() {
    const [name, setName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { state, dispatch } = useContext(DataContext)
    const user = Cookies.get('user') && JSON.parse(Cookies.get('user'))
    const { token } = parseCookies()
    const { categories } = state
    const [id, setId] = useState('')
    const createCategory = async () => {
        // if (user.role !== 'root') {
        //     errorMsg('You are not authorized to perform this action.')
        //     return
        // }
        if (!name) {
            errorMsg('Please provide a name.')
            return
        }
        setIsLoading(true)
        let res;
        if (id) {
            res = await putData(`category/${id}`, { name }, token)
            setIsLoading(false)
            if (!res.status) {
                errorMsg(res.message)
                return
            }
            dispatch(updateItem(categories, id, res.data, 'GET_CATEGORY'))
        } else {
            res = await postData('category', { name }, token)
            setIsLoading(false)
            if (!res.status) {
                errorMsg(res.message)
                return
            }
            dispatch({ type: "GET_CATEGORY", payload: [...categories, res.data] })
        }
        successMsg(res.message)
        setName('')
        setId('')
    }
    const handleEditCategory = (category) => {
        setId(category?._id)
        setName(category?.name)
    }
    useEffect(() => {
        setIsLoading(true)
        getData('category', token).then(res => {
            setIsLoading(false)
            if (!res.status) {
                errorMsg(res.message)
                return
            }
            successMsg(res.message)
            dispatch({ type: "GET_CATEGORY", payload: res.data })
        })
    }, [])
    return (
        <>
            {isLoading && <Loading />}
            <div className="col-md-12 mx-auto my-3">
                <Head>
                    <title>Category</title>
                </Head>
                <div className="alert alert-secondary justify-content-between">
                    <div className="text-uppercase">Category</div>
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control"
                        placeholder="Add a new category" value={name}
                        onChange={e => setName(e.target.value)} />
                    <button className="btn btn-secondary ml-1"
                        onClick={createCategory}>
                        {id ? "Update" : "Create"}
                    </button>
                </div>
                {
                    categories.map(category => (
                        <div key={category?._id} className="card my-2 text-capitalize">
                            <div className="card-body d-flex justify-content-between">
                                {category?.name}
                                <div style={{ cursor: 'pointer' }}>
                                    <i className="fas fa-edit mr-2 text-info"
                                        onClick={() => handleEditCategory(category)}></i>
                                    {user && user.role === 'root' && <i className="fas fa-trash-alt text-danger"
                                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => dispatch({
                                            type: 'ADD_MODAL',
                                            payload: {
                                                data: categories, _id: category?._id,
                                                title: category?.name, type: 'GET_CATEGORY'
                                            }
                                        })} ></i>}

                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
export default CategoryIndex