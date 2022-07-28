import { createContext, useEffect, useReducer } from 'react';
import reducers from './Reducers';

import Cookies from 'js-cookie';
import { parseCookies } from 'nookies';
export const DataContext = createContext();

export const DataProvider = ({ children }) =>
{
    const initialState = {
        notify: {},
        auth: {},
        cart: []
    }
    const { token, user, __nextStore__cart__00 } = parseCookies()
    const [state, dispatch] = useReducer(reducers, initialState);
    const { cart, auth } = state

    useEffect(() =>
    {
        if (cart.length > 0) {

            Cookies.set('__nextStore__cart__00', cart, { expires: 7 });
        }
    }, [cart])

    useEffect(() =>
    {
        if (__nextStore__cart__00 && __nextStore__cart__00.length > 0) {
            dispatch({ type: 'ADD_TO_CART', payload: __nextStore__cart__00 })
        }

    }, [])

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}

