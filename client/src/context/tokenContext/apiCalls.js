import axios from "axios";
import { toast } from 'react-toastify';

import {
    tokenFailure,
    tokenStart,
    tokenSuccess
} from "./TokenActions";

export const getToken = async (user, dispatch) => {
    dispatch(tokenStart());

    try {
        await axios.get(`/investor/token/${user.username}`, {
            headers: {
                token: "Bearer " + user.accessToken
            }
        }).then((res, err) => {
            if (err) {
                dispatch(tokenFailure());
                toast.error(err.response.data, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                dispatch(tokenSuccess(res.data));
            }
        });
    } catch (err) {
        dispatch(tokenFailure());

        if (err.response.data === 'Wrong access token!') {
            localStorage.removeItem("user");
            window.location.reload(false);
        } else if (err.response.data !== 'No grail found!') {
            toast.error(err.response.data, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
}

export const insertToken = async (balance, network, user, address, dispatch) => {
    const username = user.username;

    try {
        await axios.post('/investor/inputToken', { balance, network, username, address }, {
            headers: {
                token: "Bearer " + user.accessToken
            }
        }).then((res, err) => {
            if (!err) {
                getToken(user, dispatch);
            }
        });
    } catch (err) {
        if (err.response.data === 'Wrong access token!') {
            localStorage.removeItem("user");
            window.location.reload(false);
        }
    }
}

export const updateToken = async (balance, network, user, address, dispatch) => {
    const username = user.username;

    try {
        await axios.put('/investor/newToken', { balance, network, username, address }, {
            headers: {
                token: "Bearer " + user.accessToken
            }
        }).then((res, err) => {
            if (!err) {
                getToken(user, dispatch);
            }
        });
    } catch (err) {
        if (err.response.data === 'Wrong access token!') {
            localStorage.removeItem("user");
            window.location.reload(false);
        }
    }
}

export const updateX = async (stake, locktime, xGrail, phase, user, address, network, dispatch) => {
    const username = user.username;

    try {
        await axios.put('/investor/newXgrail', { stake, locktime, xGrail, phase, username, address, network }, {
            headers: {
                token: "Bearer " + user.accessToken
            }
        }).then((res, err) => {
            if (!err) {
                getToken(user, dispatch);
            }
        });
    } catch (err) {
        if (err.response.data === 'Wrong access token!') {
            localStorage.removeItem("user");
            window.location.reload(false);
        }
    }
}