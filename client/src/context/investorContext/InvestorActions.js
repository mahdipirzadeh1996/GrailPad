export const investorStart = () => ({
    type: "INVESTOR_START"
});
export const investorSuccess = (investor) => ({
    type: "INVESTOR_SUCCESS",
    payload: investor,
});
export const investorFailure = () => ({
    type: "INVESTOR_FAILURE"
});