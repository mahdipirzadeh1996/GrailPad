const AdminIdoReducer = (state, action) => {
    switch (action.type) {
        case "GET_ADMINIDO_START":
            return {
                adminIdo: null,
                isFetching: true,
                error: false,
            };
        case "GET_ADMINIDO_SUCCESS":
            return {
                adminIdo: action.payload,
                isFetching: false,
                error: false,
            };
        case "GET_ADMINIDO_FAILURE":
            return {
                adminIdo: null,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };
    }
}

export default AdminIdoReducer;