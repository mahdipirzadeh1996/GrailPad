import axios from "axios";
import { toast } from 'react-toastify';

import { authFailure, authStart, authSuccess } from "./AuthActions";

const CryptoJs = require("crypto-js");

export const testUser = async (dispatch) => {
    //dispatch(authStart());
    try {
        const user = JSON.parse(localStorage.getItem("phone"));
        const accessToken = user.accessToken;

        const res = await axios.get(`/api/testuser/${JSON.stringify(user.result[0])}`, {
            headers: {
                token: "Bearer " + accessToken
            }
        });
        let decryptInsertJwt = CryptoJs.AES.decrypt(res.data, process.env.REACT_APP_SECRET).toString(CryptoJs.enc.Utf8);

        if (decryptInsertJwt === "wrongToken") {
            dispatch(authFailure());
            localStorage.removeItem("phone");
        } else {
            dispatch(authSuccess(res.data));
            //localStorage.setItem("users", JSON.stringify(res.data));
        }
    } catch (err) {
        dispatch(authFailure());
    }
};

export const register = async (user, dispatch, setAuth) => {
    dispatch(authStart());

    try {
        await axios.post("/investor/register", user).then((res, err) => {
            if (err) {
                dispatch(authFailure());
                toast.error('Try again!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                dispatch(authSuccess(res.data));
                toast.success('Registration complete!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setAuth(false);
            }
        });
    } catch (err) {
        dispatch(authFailure());
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
};

export const login = async (user, dispatch, setAuth) => {
    dispatch(authStart());

    try {
        await axios.get(`/investor/login/${JSON.stringify(user)}`).then((res, err) => {
            if (err) {
                dispatch(authFailure());
                toast.error('Try again!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                dispatch(authSuccess(res.data));
                toast.success('Login complete!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setAuth(false);
            }
        });
    } catch (err) {
        dispatch(authFailure());
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
};

export const regEmail = async (user, dispatch, setVerify) => {
    dispatch(authStart());

    try {
        await axios.post("/investor/sendEmail", user).then((res, err) => {
            if (err) {
                dispatch(authFailure());
                toast.error('Try again!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                dispatch(authSuccess(''));
                setVerify(true);
            }
        });
    } catch (err) {
        dispatch(authFailure());
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
};

export const validation = async (email, code, dispatch, setVerify, setAuth) => {
    dispatch(authStart());

    try {
        await axios.post("/investor/validation", { email, code }).then((res, err) => {
            if (err) {
                dispatch(authFailure());
                toast.error(err, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                dispatch(authSuccess(res.data));
                toast.success('Registration complete!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setAuth(false);
                setVerify(false);
            }
        });
    } catch (err) {
        dispatch(authFailure());
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
};

export const regEditEmail = async (newEmail, user, dispatch, setVerify) => {
    dispatch(authStart());

    try {
        await axios.post("/investor/sendEditEmail", { newEmail }, {
            headers: {
                token: "Bearer " + user.accessToken
            }
        }).then((res, err) => {
            if (err) {
                dispatch(authFailure());
                toast.error('Try again!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                dispatch(authSuccess(user));
                toast.success(res.data, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setVerify(true);
            }
        });
    } catch (err) {
        dispatch(authFailure());
        if (err.response.data === 'Wrong access token!') {
            localStorage.removeItem("user");
            window.location.reload(false);
        } else {
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
};

export const emailUpdate = async (user, newEmail, code, dispatch, setEdit, setVerify) => {
    dispatch(authStart());

    const email = String(user.email);

    try {
        await axios.post('/investor/updateValidation', { email, newEmail, code }, {
            headers: {
                token: "Bearer " + user.accessToken
            }
        }).then((res, err) => {
            if (err) {
                dispatch(authFailure());
                toast.error(err, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                dispatch(authSuccess(res.data));
                toast.success('Email successfully edited!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setEdit(false);
                setVerify(false);
            }
        });
    } catch (err) {
        dispatch(authFailure());
        if (err.response.data === 'Wrong access token!') {
            localStorage.removeItem("user");
            window.location.reload(false);
        } else {
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