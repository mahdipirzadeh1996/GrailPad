export const tokenStart = () => ({
    type: "TOKEN_START"
});
export const tokenSuccess = (token) => ({
    type: "TOKEN_SUCCESS",
    payload1: token,
});
export const tokenFailure = () => ({
    type: "TOKEN_FAILURE"
});