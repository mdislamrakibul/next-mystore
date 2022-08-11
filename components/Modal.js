import { parseCookies } from 'nookies';
import React, { useContext } from 'react';
import { deleteData } from '../helpers/dataOps';
import { successMsg } from '../helpers/Toastify';
import { deleteItem, removeFromCart } from '../store/Actions';
import { DataContext } from '../store/GlobalState';

const Modal = () =>
{

    const { state, dispatch } = useContext(DataContext)
    const { modal, cart } = state
    const { token } = parseCookies()
    const handleClick = () =>
    {

        if (Object.entries(modal).length > 0) {
            if (modal.type === 'ADD_TO_CART') {
                dispatch(removeFromCart(modal.data, modal._id, modal.title, modal.type))
            }

            if (modal.type === 'GET_CATEGORY') deleteCategories(modal)

            if (modal.type === 'DELETE_PRODUCT') deleteProduct(modal)

            dispatch({ type: 'ADD_MODAL', payload: {} })
        }
    }
    const deleteCategories = (modal) =>
    {
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
    return (
        <>
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