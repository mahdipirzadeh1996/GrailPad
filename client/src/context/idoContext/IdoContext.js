import IdoReducer from "./IdoReducer";
import React, { createContext, useReducer } from "react";

const INITIAL_STATE = {
    ido: null,
    isFetching: false,
    error: false,
}

export const IdoContext = createContext(INITIAL_STATE);

export const IdoContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(IdoReducer, INITIAL_STATE);

    return (
        <IdoContext.Provider
            value={{
                ido: state.ido,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >{children}</IdoContext.Provider>
    )
}