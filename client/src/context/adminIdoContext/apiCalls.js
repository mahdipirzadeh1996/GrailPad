import {
    getAdminIdoFailure,
    getAdminIdoStart,
    getAdminIdoSuccess
} from "./AdminIdoAction";
import axios from "axios";
import { toast } from 'react-toastify';

export const getAdminIdo = async (user, dispatch) => {
    dispatch(getAdminIdoStart());

    try {
        await axios.get(`/admin/ido/${user.email}`, {
            headers: {
                token: "Bearer " + user.accessToken
            }
        }).then((res, err) => {
            if (err) {
                dispatch(getAdminIdoFailure());
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
                dispatch(getAdminIdoSuccess(res.data));
            }
        });
    } catch (err) {
        dispatch(getAdminIdoFailure());

        if (err.response.data === 'Wrong access token!') {
            localStorage.removeItem("user");
            window.location.reload(false);
        }
    }
}