export const authStart = () => ({
    type: "AUTH_START"
});
export const authSuccess = (user) => ({
    type: "AUTH_SUCCESS",
    payload: user,
});
export const authFailure = () => ({
    type: "AUTH_FAILURE"
});

//LOGOUT
export const logout = () => ({
    type: "LOGOUT",
});