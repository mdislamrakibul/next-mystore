import { createContext, useEffect, useReducer } from 'react';
import reducers from './Reducers';

import { parseCookies } from 'nookies';
import { getData } from '../helpers/dataOps';
export const DataContext = createContext();

export const DataProvider = ({ children }) =>
{
    const initialState = {
        notify: {},
        auth: {},
        cart: [],
        modal: {},
        orders: [],
        categories: [],
        bulkDeleteData: []
    }
    const { token, user } = parseCookies()
    const [state, dispatch] = useReducer(reducers, initialState);
    const { cart, auth } = state

    useEffect(() =>
    {
        if (cart.length) {
            // Cookies.set('__nextStore__cart__00_C', cart, { expires: 7 });
            localStorage.setItem('__nextStore__cart__00_L', JSON.stringify(cart))

        }
    }, [cart])

    useEffect(() =>
    {
        const __nextStore__cart__00_L = JSON.parse(localStorage.getItem('__nextStore__cart__00_L'))
        if (__nextStore__cart__00_L) dispatch({ type: 'ADD_TO_CART', payload: __nextStore__cart__00_L })

        // const __nextStore__cart__00_C = Cookies.get('__nextStore__cart__00_C')
        // if (__nextStore__cart__00_C) dispatch({ type: 'ADD_TO_CART', payload: __nextStore__cart__00_C })
    }, [])


    useEffect(() =>
    {
        if (token) {
            getData('order', token)
                .then(res =>
                {
                    dispatch({ type: 'GET_ORDER', payload: res.data })
                })
        }
    }, [])

    useEffect(() =>
    {
        if (token) {
            getData('category', token)
                .then(res =>
                {
                    dispatch({
                        type: "GET_CATEGORY", payload: res.data
                    })
                })
        }
    }, [])



    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}
