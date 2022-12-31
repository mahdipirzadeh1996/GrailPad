import AdminIdoReducer from './AdmindoReducer';
import React, { createContext, useReducer } from "react";

const INITIAL_STATE = {
    adminIdo: null,
    isFetching: false,
    error: false,
}

export const AdminIdoContext = createContext(INITIAL_STATE);

export const AdminIdoContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AdminIdoReducer, INITIAL_STATE);

    return (
        <AdminIdoContext.Provider
            value={{
                adminIdo: state.adminIdo,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >{children}</AdminIdoContext.Provider>
    )
}