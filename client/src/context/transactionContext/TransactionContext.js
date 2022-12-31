import React, { createContext, useReducer } from "react";

import TransactionReducer from "./TransactionReducer";

const INITIAL_STATE = {
    transaction: null,
    isFetching: false,
    error: false,
};

export const TransactionContext = createContext(INITIAL_STATE);

export const TransactionContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(TransactionReducer, INITIAL_STATE);

    return (
        <TransactionContext.Provider
            value={{
                transaction: state.transaction,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </TransactionContext.Provider>
    )
}