const InvestorReducer = (state, action) => {
    switch (action.type) {
        case "TOKEN_START":
            return {
                token: null,
                isFetching: false,
                error: true,
            };
        case "TOKEN_SUCCESS":
            return {
                token: action.payload1,
                isFetching: false,
                error: false,
            };
        case "TOKEN_FAILED":
            return {
                token: null,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };
    }
}

export default InvestorReducer;