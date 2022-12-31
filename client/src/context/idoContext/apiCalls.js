import {
    createIdoFailure,
    createIdoStart, createIdoSuccess,
    deleteMovieFailure,
    deleteMovieStart,
    deleteMovieSuccess,
    getMoviesFailure,
    getMoviesStart,
    getMoviesSuccess
} from "./IdoActions";
import axios from "axios";
import { toast } from 'react-toastify';

//GET with token
// export const getMovies = async (dispatch) => {
//     dispatch(getMoviesStart());
//     try {
//         const res = await axios.get("/movies/", {
//             headers: {
//                 token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
//             }
//         });
//         dispatch(getMoviesSuccess(res.data));
//         localStorage.setItem("movies", JSON.stringify(res.data))
//     } catch (err) {
//         dispatch(getMoviesFailure());
//     }
// }
//Get with mysql
export const getMovies = async (dispatch) => {
    dispatch(getMoviesStart());
    try {
        const res = await axios.get("/movies");
        dispatch(getMoviesSuccess(res.data));
        localStorage.setItem("movies", JSON.stringify(res.data));
    } catch (err) {
        dispatch(getMoviesFailure());
    }
}

//CREATE
export const createIdo = async (myData, paper, user, dispatch) => {
    dispatch(createIdoStart());

    const data = new FormData();

    data.append("paperName", "paper");
    data.append("file", paper);
    data.append("data", JSON.stringify(myData));

    try {
        await axios.post('/investor/ido', data, {
            headers: {
                token: 'Bearer ' + user.accessToken
            }
        }).then((res, err) => {
            if (err) {
                dispatch(createIdoFailure());

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
                dispatch(createIdoSuccess(res.data));
                toast.success(res.data, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        });
    } catch (err) {
        dispatch(createIdoFailure());

        if (err.response.data === 'Wrong access token!') {
            localStorage.removeItem('user');

            toast.error('Please login!!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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

//UPDATE
/*export const updateMovie = async (movie, dispatch) => {
    dispatch(updateMovieStart());
    try {
        const res = await axios.update("/movies/", movie, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
        });
        dispatch(createMovieSuccess(res.data));
    } catch (err) {
        dispatch(createMovieFailure());
    }
}*/

//DELETE
export const deleteMovie = async (id, dispatch) => {
    dispatch(deleteMovieStart());
    try {
        await axios.delete("/movies/" + id, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
        });
        dispatch(deleteMovieSuccess(id));
        getMovies(dispatch);
    } catch (err) {
        dispatch(deleteMovieFailure());
    }
}