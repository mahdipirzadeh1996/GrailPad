import React, { createContext, useReducer } from "react";

import TokenReducer from "./TokenReducer";

const INITIAL_STATE = {
    token: null,
    isFetching: false,
    error: false,
};

export const TokenContext = createContext(INITIAL_STATE);

export const TokenContextProvider = ({ children }) => {
    const [state, dispatchh] = useReducer(TokenReducer, INITIAL_STATE);

    return (
        <TokenContext.Provider
            value={{
                token: state.token,
                isFetching: state.isFetching,
                error: state.error,
                dispatchh
            }}
        >
            {children}
        </TokenContext.Provider>
    )
}