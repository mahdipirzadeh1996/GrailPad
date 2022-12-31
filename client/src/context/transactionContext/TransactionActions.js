export const transactionStart = () => ({
    type: "TRANSACTION_START"
});
export const transactionSuccess = (transaction) => ({
    type: "TRANSACTION_SUCCESS",
    payload1: transaction,
});
export const transactionFailure = () => ({
    type: "TRANSACTION_FAILURE"
});