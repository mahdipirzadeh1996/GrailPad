import axios from "axios";
import { toast } from 'react-toastify';

import {
    transactionFailure,
    transactionStart,
    transactionSuccess
} from "./TransactionActions";

// export const getToken = async (user, dispatch) => {
//     dispatch(tokenStart());

//     try {
//         await axios.get(`/investor/token/${user.username}`, {
//             headers: {
//                 token: "Bearer " + user.accessToken
//             }
//         }).then((res, err) => {
//             if (err) {
//                 dispatch(tokenFailure());
//                 toast.error(err.response.data, {
//                     position: "top-right",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                 });
//             } else {
//                 dispatch(tokenSuccess(res.data));
//             }
//         });
//     } catch (err) {
//         dispatch(tokenFailure());

//         if (err.response.data === 'Wrong access token!') {
//             localStorage.removeItem("user");
//         } else if (err.response.data !== 'No grail found!') {
//             toast.error(err.response.data, {
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//             });
//         }
//     }
// }

export const insertTransaction = async (title, hash, from_address, to_address, for_token, fee, time, status, user, address, dispatch) => {
    dispatch(transactionStart());
    const username = user.username;
    console.log(hash)

    try {
        await axios.post('/investor/newTransaction', { title, hash, from_address, to_address, for_token, fee, time, status, username, address }, {
            headers: {
                token: "Bearer " + user.accessToken
            }
        }).then((res, err) => {
            if (err) {
                dispatch(transactionFailure());
            } else {
                dispatch(transactionSuccess());
            }
        });
    } catch (err) {
        if (err.response.data === 'Wrong access token!') {
            localStorage.removeItem("user");
            window.location.reload(false);
        }
    }
}