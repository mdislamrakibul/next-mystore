import React, { useContext } from 'react';
import { removeFromCart } from '../store/Actions';
import { DataContext } from '../store/GlobalState';

const Modal = () =>
{

    const { state, dispatch } = useContext(DataContext)
    const { modal, cart } = state

    const handleClick = () =>
    {
        dispatch(removeFromCart(modal.data, modal._id, modal.title, modal.type))
        dispatch({ type: 'ADD_MODAL', payload: {} })
    }
    return (
        <>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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