
import { ACTIONS } from './Actions';

const reducers = (state, action) => {
    switch (action.type) {

        case ACTIONS.NOTIFY:
            return {
                ...state,
                notify: action.payload
            }
        case ACTIONS.AUTH:
            return {
                ...state,
                auth: action.payload
            }
        case ACTIONS.ADD_TO_CART:
            return {
                ...state,
                cart: action.payload
            }
        case ACTIONS.ADD_MODAL:
            return {
                ...state,
                modal: action.payload
            }
        // case ACTIONS.REMOVE_FROM_CART:
        //     return {
        //         ...state,
        //         modal: action.payload
        //     }
        case ACTIONS.GET_ORDER:
            return {
                ...state,
                orders: action.payload
            }
        case ACTIONS.GET_CATEGORY:
            return {
                ...state,
                categories: action.payload
            }
        case ACTIONS.BULK_DELETE:
            return {
                ...state,
                bulkDeleteData: action.payload
            }
        case ACTIONS.ONLINE_PAY:
            return {
                ...state,
                onlinePay: action.payload
            }
        default:
            return state
    }
}


export default reducers