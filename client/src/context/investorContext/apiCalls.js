import axios from "axios";
import { toast } from 'react-toastify';

import {
    investorFailure,
    investorStart,
    investorSuccess
} from "./InvestorActions";

export const getAddress = async (user, dispatch) => {
    dispatch(investorStart());

    try {
        await axios.get(`/investor/address/${user.username}`, {
            headers: {
                token: "Bearer " + user.accessToken
            }
        }).then((res, err) => {
            if (err) {
                dispatch(investorFailure());
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
                dispatch(investorSuccess(res.data));
            }
        });
    } catch (err) {
        dispatch(investorFailure());

        if (err.response.data === 'Wrong access token!') {
            localStorage.removeItem("user");
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

export const insertAddress = async (address, user, dispatch) => {
    const username = user.username;

    try {
        await axios.post("/investor/inputAddress", { address, username }, {
            headers: {
                token: "Bearer " + user.accessToken
            }
        }).then((res, err) => {
            if (!err) {
                getAddress(user, dispatch);
            }
        });
    } catch (err) {
        if (err.response.data === 'Wrong access token!') {
            localStorage.removeItem("user");
        } else if (err.response.data === 'This account belongs to someone else. Please change it!') {
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