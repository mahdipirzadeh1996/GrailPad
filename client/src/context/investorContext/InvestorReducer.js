const InvestorReducer = (state, action) => {
    switch (action.type) {
        case "INVESTOR_START":
            return {
                investor: null,
                isFetching: true,
                error: false,
            };
        case "INVESTOR_SUCCESS":
            return {
                investor: action.payload,
                isFetching: false,
                error: false,
            };
        case "INVESTOR_FAILURE":
            return {
                investor: null,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };
    }
}

export default InvestorReducer;