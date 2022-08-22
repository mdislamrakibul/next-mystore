import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React, { useContext, useState } from 'react';
import { deleteData, postData } from '../helpers/dataOps';
import { errorMsg, successMsg } from '../helpers/Toastify';
import { deleteItem, removeFromCart } from '../store/Actions';
import { DataContext } from '../store/GlobalState';
import Loading from './Loading';

const Modal = () =>
{

    const { state, dispatch } = useContext(DataContext)
    const { modal, cart } = state
    const { token } = parseCookies()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const handleClick = () =>
    {

        if (Object.entries(modal).length > 0) {
            if (modal.type === 'ADD_TO_CART') {
                dispatch(removeFromCart(modal.data, modal._id, modal.title, modal.type))
            }

            if (modal.type === 'GET_CATEGORY') deleteCategories(modal)

            if (modal.type === 'DELETE_PRODUCT') deleteProduct(modal)
            if (modal.type === 'BULK_DELETE_PRODUCT') bulkDeleteProduct(modal)

            dispatch({ type: 'ADD_MODAL', payload: {} })
        }
    }
    const deleteCategories = (modal) =>
    {
        if (!token) {
            errorMsg('You are not authorized to perform this action')
            router.push('/login')
        }
        deleteData(`category/${modal._id}`, token)
            .then(res =>
            {
                if (!res.status) {
                    errorMsg(res.message)
                    return
                }

                dispatch(deleteItem(modal.data, modal._id, modal.type))
                successMsg(res.message)
            })
    }
    const deleteProduct = (modal) =>
    {
        if (!token) {
            errorMsg('You are not authorized to perform this action')
            router.push('/login')
        }
        setIsLoading(true)
        deleteData(`products/${modal._id}`, token)
            .then(res =>
            {
                setIsLoading(false)
                if (!res.status) {
                    errorMsg(res.message)
                }
                successMsg(res.message)
                router.push('/admin/product/list')
            })
    }

    const bulkDeleteProduct = (modal) =>
    {
        if (!token) {
            errorMsg('You are not authorized to perform this action')
            router.push('/login')
        }
        if (modal.data.length < 2) {
            errorMsg('Please select at least 2 products')
            return
        }
        // setIsLoading(true)
        postData(`products/bulkDelete`, modal.data, token)
            .then(res =>
            {
                setIsLoading(false)
                if (!res.status) {
                    errorMsg(res.message)
                }
                successMsg(res.message)
                dispatch({ type: 'BULK_DELETE', payload: [] })
                router.push('/admin/product/list')
            })
    }

    return (
        <>
            {isLoading && <Loading />}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{modal.title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure to delete ?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => handleClick()}>
                                <i className="fas fa-check-circle"></i>&nbsp;Yes</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                <i className="fas fa-times"></i>&nbsp;
                                Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal