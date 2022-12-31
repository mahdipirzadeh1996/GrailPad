import React, { useState, useContext, useEffect } from 'react';
import { Close, Visibility, VisibilityOff } from "@material-ui/icons";
import Lottie from 'react-lottie';
import animationData from '../../lottie/login.json';
import { toast, ToastContainer } from 'react-toastify';
import '../../../node_modules/react-toastify/dist/ReactToastify.css';
import DotLoader from "react-spinners/DotLoader";
import { css } from "@emotion/react";

import './editDialog.scss';

import { AuthContext } from '../../context/authContext/AuthContext';
import { validation, regEditEmail, emailUpdate } from '../../context/authContext/apiCalls';

const override = css`
  display: block;
`;

const AuthDialog = ({ setEdit }) => {
    const [newEmail, setNewEmail] = useState(null);
    const [verify, setVerify] = useState(false);
    const [counter, setCounter] = useState(120);
    const [code, setCode] = useState('');

    const { user, isFetching, dispatch } = useContext(AuthContext);

    let myCounter;

    // useEffect(() => {
    //     if (verify) {
    //         counter > 0 && timmer();
    //         if (counter === 0) {
    //             setVerify(false);
    //             toast.error('Code is expired, try again!!!', {
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
    // });

    const timmer = () => {
        myCounter = setTimeout(() => setCounter(counter - 1), 1000);
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    // const registerUser = () => {
    //     if (userReg !== null) {
    //         if (userReg.emailReg === undefined || userReg.passwordReg === undefined || userReg.rePasswordReg === undefined) {
    //             toast.error('Please complete all fields!', {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //             });
    //         } else {
    //             if (userReg.passwordReg === userReg.rePasswordReg) {
    //                 register(userReg, dispatch, setEdit);
    //             } else {
    //                 toast.error('Passwords are not the same!', {
    //                     position: "top-right",
    //                     autoClose: 5000,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,
    //                     pauseOnHover: true,
    //                     draggable: true,
    //                     progress: undefined,
    //                 });
    //             }
    //         }
    //     } else {
    //         toast.error('Please complete all fields!', {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //         });
    //     }
    // };

    const sendEmail = () => {
        if (newEmail === null || newEmail === '') {
            toast.error('Please complete all fields!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            regEditEmail(newEmail, user, dispatch, setVerify);
        }
    };

    const validateCode = () => {
        if (code !== '' && code.length === 6) {
            emailUpdate(user, newEmail, code, dispatch, setVerify, setEdit);
        } else {
            toast.error('Please enter the code correctly!', {
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

    return (
        <div className='authDialog'>
            {!verify ?
                <div className='main'>
                    <Lottie
                        options={defaultOptions}
                        height={120}
                        width={120}
                    />

                    <div className='form'>
                        <div className='top'>
                            <h1>Edit email</h1>
                        </div>
                        <div className='middle'>
                            <div className='inpContain'>
                                <input
                                    type={'text'}
                                    maxLength={100}
                                    placeholder='New Email'
                                    className='inp'
                                    name={'emailReg'}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                />
                            </div>

                            <button disabled={isFetching} className='loginBtn' onClick={sendEmail}>
                                {!isFetching && 'Submit'}
                                <DotLoader color={"#fff"} loading={isFetching} css={override} size={30} />
                            </button>

                        </div>
                        {/* <div className='top'>
                            <h6>Do you already have account?</h6>
                            <h5 onClick={() => setIsLogin(true)}>Login</h5>
                        </div> */}
                    </div>

                    <button
                        onClick={() => setEdit(false)}
                        className='close'>
                        <Close className='closeIcon' />
                    </button>
                </div>
                :
                <div className='main'>
                    <Lottie
                        options={defaultOptions}
                        height={120}
                        width={120}
                    />

                    <div className='form'>
                        <div className='top'>
                            <h1>Verify</h1>
                        </div>
                        <div className='middle'>
                            <div className='inpContain'>
                                <input
                                    type={'number'}
                                    maxLength={6}
                                    placeholder='6-digit code'
                                    className='inp'
                                    name={'code'}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                            </div>

                            <button disabled={isFetching} className='loginBtn' onClick={validateCode}>
                                {!isFetching && 'Verify'}
                                <DotLoader color={"#fff"} loading={isFetching} css={override} size={30} />
                            </button>

                        </div>
                        <div className='top'>
                            <h6>Remaining time:</h6>
                            <h5>{counter}</h5>
                        </div>
                    </div>

                    <button
                        onClick={() => setEdit(false)}
                        className='close'>
                        <Close className='closeIcon' />
                    </button>
                </div>
            }
            <ToastContainer />
        </div>
    )
}

export default AuthDialog;