import React, { createContext, useReducer } from "react";

import InvestorReducer from "./InvestorReducer";

const INITIAL_STATE = {
    investor: null,
    isFetching: false,
    error: false,
};

export const InvestorContext = createContext(INITIAL_STATE);

export const InvestorContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(InvestorReducer, INITIAL_STATE);

    return (
        <InvestorContext.Provider
            value={{
                investor: state.investor,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </InvestorContext.Provider>
    )
}