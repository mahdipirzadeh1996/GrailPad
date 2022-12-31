const TransactionReducer = (state, action) => {
    switch (action.type) {
        case "TRANSACTION_START":
            return {
                transaction: null,
                isFetching: true,
                error: false,
            };
        case "TRANSACTION_SUCCESS":
            return {
                transaction: action.payload,
                isFetching: false,
                error: false,
            };
        case "TRANSACTION_FAILURE":
            return {
                transaction: null,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };
    }
}

export default TransactionReducer;