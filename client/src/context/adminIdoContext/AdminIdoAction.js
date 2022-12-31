export const getAdminIdoStart = () => ({
    type: "GET_ADMINIDO_START"
});
export const getAdminIdoSuccess = (adminIdo) => ({
    type: "GET_ADMINIDO_SUCCESS",
    payload: adminIdo
});
export const getAdminIdoFailure = () => ({
    type: "GET_ADMINIDO_FAILURE"
});