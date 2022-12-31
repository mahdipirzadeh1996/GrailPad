import React, { useState, useRef, useEffect, useContext } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from 'react-toastify';
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/react";

import './applyIdo.scss';
import { AuthContext } from '../../context/authContext/AuthContext';
import { IdoContext } from '../../context/idoContext/IdoContext';
import { createIdo } from '../../context/idoContext/apiCalls';

const override = css`
  display: block;
  border-color: red;
`;

const ApplyIdo = ({ open }) => {
    const [titleType, setTitleType] = useState("");
    const [fund, setFund] = useState("");
    const [dox, setDox] = useState("");
    const [purpose, setPurpose] = useState("");
    const [fileName, setFileName] = useState('');
    const [isVerifyied, setIsVerified] = useState(false);
    const [data, setData] = useState(null);
    const [paper, setPaper] = useState(null);

    const hiddenFileInput = useRef(null);
    const reRef = useRef();

    const { user } = useContext(AuthContext);
    const { isFetching, dispatch } = useContext(IdoContext);

    useEffect(() => {
        if (data !== null && data.isFundRaise !== undefined) {
            if (data.isFundRaise !== '1') {
                delete data.raise;
            }
        }
        if (data !== null && data.purpose !== undefined) {
            if (data.purpose !== '6') {
                delete data.otherPurpose;
            }
        }
    }, [data])

    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    const handleOnChange = (e) => {
        const value = e.target.value;
        setData({ ...data, [e.target.name]: value });
    }

    const handleRadio = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        switch (name) {
            case 'projectStatus':
                setTitleType(value);
                break;
            case 'isFundRaise':
                setFund(value);
                break;
            case 'dox':
                setDox(value);
                break;
            case 'purpose':
                setPurpose(value);
                break;
        }

        setData({ ...data, [e.target.name]: value });
    }

    const onRecaptchaChange = (value) => {
        console.log('Captch value: ', value)

        if (value) {
            setIsVerified(true);
        } else {
            setIsVerified(false);
        }
    }

    const submit = (e) => {
        e.preventDefault();

        if (user) {
            if (data !== null) {
                if (data.projectName === undefined || data.summary === undefined || data.projectStatus === undefined || data.isFundRaise === undefined || data.dox === undefined || data.purpose === undefined || data.migration === undefined || data.planning === undefined || data.description === undefined || data.site === undefined || data.twitter === undefined || data.telegram === undefined || paper === null) {
                    toast.error('Please complete star fields!!!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    if (data.projectName.length === 0 || data.summary.length === 0 || data.projectStatus.length === 0 || data.isFundRaise.length === 0 || data.dox.length === 0 || data.purpose.length === 0 || data.migration.length === 0 || data.planning.length === 0 || data.description.length === 0 || data.site.length === 0 || data.twitter.length === 0 || data.telegram.length === 0) {
                        toast.error('Please complete star fields!!!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else {
                        if (data.isFundRaise === '1' && data.purpose !== '6') {
                            if (data.raise === undefined) {
                                toast.error('Please complete star fields!!!', {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                            } else {
                                if (data.raise.length === 0) {
                                    toast.error('Please complete star fields!!!', {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });
                                } else {
                                    createIdo(data, paper, user, dispatch);
                                }
                            }
                        } else if (data.isFundRaise !== '1' && data.purpose === '6') {
                            if (data.otherPurpose === undefined) {
                                toast.error('Please complete star fields!!!', {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                            } else {
                                if (data.otherPurpose.length === 0) {
                                    toast.error('Please complete star fields!!!', {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });
                                } else {
                                    createIdo(data, paper, user, dispatch);
                                }
                            }
                        } else if (data.isFundRaise === '1' && data.purpose === '6') {
                            if (data.raise === undefined || data.otherPurpose === undefined) {
                                toast.error('Please complete star fields!!!', {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                            } else {
                                if (data.raise.length === 0 || data.otherPurpose.length === 0) {
                                    toast.error('Please complete star fields!!!', {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });
                                } else {
                                    createIdo(data, paper, user, dispatch);
                                }
                            }
                        } else {
                            createIdo(data, paper, user, dispatch);
                        }
                    }
                }
            } else {
                toast.error('Please complete star fields!!!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else {
            toast.error('Please login!!!!', {
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
        <div className='applyIdo' style={{ marginLeft: open ? '17rem' : '5vw' }}>
            <div className='header'>
                <h2>Apply for IDO</h2>
            </div>

            <div className='main'>
                <div className='applyLabel'>
                    <span>Project Name</span>
                </div>
                <div className='applyInput'>
                    <input placeholder='Project Name' className='inp' name={'projectName'} type={'text'} maxLength={40} onChange={handleOnChange} />
                    <h1 className='force'>*</h1>
                </div>


                <div className='applyLabel'>
                    <span>What is Your Project About (Briefly):</span>
                </div>
                <div className='applyInput'>
                    <input placeholder='Project Brief' className='inp' name={'summary'} type={'text'} maxLength={500} onChange={handleOnChange} />
                    <h1 className='force'>*</h1>
                </div>

                <div className='seperator' />

                <div className='applyLabel'>
                    <span>Project Status</span>
                    <h1 className='force'>*</h1>
                </div>
                <p>
                    <input className={"radio"} type="radio" value={"1"} name={"projectStatus"} checked={titleType === "1"} onChange={handleRadio} />
                    <span>Just an initial idea</span>
                </p>
                <p>
                    <input className={"radio"} type="radio" value={"2"} name={"projectStatus"} checked={titleType === "2"} onChange={handleRadio} />
                    <span>Idea with White Paper</span>
                </p>
                <p>
                    <input className={"radio"} type="radio" value={"3"} name={"projectStatus"} checked={titleType === "3"} onChange={handleRadio} />
                    <span>In early development</span>
                </p>
                <p>
                    <input className={"radio"} type="radio" value={"4"} name={"projectStatus"} checked={titleType === "4"} onChange={handleRadio} />
                    <span>In late stage of development</span>
                </p>
                <p>
                    <input className={"radio"} type="radio" value={"5"} name={"projectStatus"} checked={titleType === "5"} onChange={handleRadio} />
                    <span>Ready to launch</span>
                </p>
                <p>
                    <input className={"radio"} type="radio" value={"6"} name={"projectStatus"} checked={titleType === "6"} onChange={handleRadio} />
                    <span>Already launched</span>
                </p>

                <div className='seperator' />

                <div className='applyLabel'>
                    <span>Have you already raised funds?</span>
                    <h1 className='force'>*</h1>
                </div>
                <p>
                    <input className={"radio"} type="radio" value={"1"} name={"isFundRaise"} checked={fund === "1"} onChange={handleRadio} />
                    <span>Yes</span>
                </p>
                <p>
                    <input className={"radio"} type="radio" value={"2"} name={"isFundRaise"} checked={fund === "2"} onChange={handleRadio} />
                    <span>No</span>
                </p>

                {
                    (data !== null && data.isFundRaise === '1') ?
                        <>
                            <div className='seperator' />

                            <div className='applyLabel'>
                                <span>If yes, how much?</span>
                            </div>
                            <div className='applyInput'>
                                <input placeholder='How much?' className='inp' name={'raise'} type={'text'} maxLength={100} onChange={handleRadio} />
                                <h1 className='force'>*</h1>
                            </div>
                        </>
                        :
                        null
                }

                <div className='seperator' />

                <div className='applyLabel'>
                    <span>Is your team Doxxed?</span>
                    <h1 className='force'>*</h1>
                </div>
                <p>
                    <input className={"radio"} type="radio" value={"1"} name={"dox"} checked={dox === "1"} onChange={handleRadio} />
                    <span>Fully Doxxed</span>
                </p>
                <p>
                    <input className={"radio"} type="radio" value={"2"} name={"dox"} checked={dox === "2"} onChange={handleRadio} />
                    <span>Annonymous</span>
                </p>
                <p>
                    <input className={"radio"} type="radio" value={"3"} name={"dox"} checked={dox === "3"} onChange={handleRadio} />
                    <span>Mixed</span>
                </p>

                <div className='seperator' />

                <div className='applyLabel'>
                    <span>What is your project designed for?</span>
                    <h1 className='force'>*</h1>
                </div>
                <p>
                    <input className={"radio"} type="radio" value={"1"} name={"purpose"} checked={purpose === "1"} onChange={handleRadio} />
                    <span>Binance Smart Chain</span>
                </p>
                <p>
                    <input className={"radio"} type="radio" value={"2"} name={"purpose"} checked={purpose === "2"} onChange={handleRadio} />
                    <span>Polygon</span>
                </p>
                <p>
                    <input className={"radio"} type="radio" value={"3"} name={"purpose"} checked={purpose === "3"} onChange={handleRadio} />
                    <span>Ethereum</span>
                </p>
                <p>
                    <input className={"radio"} type="radio" value={"4"} name={"purpose"} checked={purpose === "4"} onChange={handleRadio} />
                    <span>Avalanche</span>
                </p>
                <p>
                    <input className={"radio"} type="radio" value={"5"} name={"purpose"} checked={purpose === "5"} onChange={handleRadio} />
                    <span>Solana</span>
                </p>
                <p style={{ marginBottom: 0 }}>
                    <input className={"radio"} type="radio" value={"6"} name={"purpose"} checked={purpose === "6"} onChange={handleRadio} />
                    <span>Other</span>
                </p>
                {
                    (data !== null && data.purpose === '6') ?
                        <div className='applyInput' style={{ width: '20%', marginTop: 0 }}>
                            <input placeholder='Your Answer' className='inp' name={'otherPurpose'} type={'text'} maxLength={50} onChange={handleOnChange} />
                            <h1 className='force'>*</h1>
                        </div>
                        :
                        null
                }

                <div className='seperator' />

                <div className='applyLabel'>
                    <span>Are you migrating from somewhere else?</span>
                </div>
                <div className='applyInput'>
                    <input placeholder='Your Answer' className='inp' name={'migration'} type={'text'} maxLength={50} onChange={handleOnChange} />
                    <h1 className='force'>*</h1>
                </div>

                <div className='applyLabel'>
                    <span>How much are you planning on raising on the IDO?</span>
                </div>
                <div className='applyInput'>
                    <input placeholder='Your Answer' className='inp' name={'planning'} type={'text'} maxLength={100} onChange={handleOnChange} />
                    <h1 className='force'>*</h1>
                </div>

                <div className='seperator' />

                <div className='applyLabel'>
                    <span>Can you describe simply the token use case?</span>
                </div>
                <div className='applyInput'>
                    <input placeholder='Your Answer' className='inp' name={'description'} type={'text'} maxLength={200} onChange={handleOnChange} />
                    <h1 className='force'>*</h1>
                </div>

                <div className='seperator' />

                <div className='applyLabel'>
                    <span>Project Links</span>
                </div>
                <div className='applyInput'>
                    <input placeholder='Website URL' className='inp' name={'site'} type={'text'} maxLength={50} onChange={handleOnChange} />
                    <h1 className='force'>*</h1>
                </div>
                <div className='applyInput'>
                    <input placeholder='Twitter Link' className='inp' name={'twitter'} type={'text'} maxLength={300} onChange={handleOnChange} />
                    <h1 className='force'>*</h1>
                </div>
                <div className='applyInput'>
                    <input placeholder='Telegram Link' className='inp' name={'telegram'} type={'text'} maxLength={300} onChange={handleOnChange} />
                    <h1 className='force'>*</h1>
                </div>
                <div className='applyInput'>
                    <input placeholder='Medium URL' className='inp' name={'medium'} type={'text'} maxLength={300} onChange={handleOnChange} />
                </div>
                <div className='applyInput'>
                    <input placeholder='Discord URL' className='inp' name={'discord'} type={'text'} maxLength={300} onChange={handleOnChange} />
                </div>
                <div className='applyInput'>
                    <input placeholder='Github URL' className='inp' name={'github'} type={'text'} maxLength={300} onChange={handleOnChange} />
                </div>

                <div className='seperator' />

                <div className='applyLabel'>
                    <span>Project's Whitepaper</span>
                    <h1 className='force'>*</h1>
                </div>
                <div className={fileName !== '' ? 'applyUpload active' : 'applyUpload'} onClick={handleClick} style={{ cursor: 'pointer' }}>
                    <span className='span'>Upload</span>
                    <input
                        name={'paper'}
                        type={'file'}
                        ref={hiddenFileInput}
                        style={{ display: 'none' }}
                        accept=".pdf"
                        onChange={(e) => {
                            var upld = e.target.files[0].name.split('.').pop();
                            if (upld == 'pdf') {
                                setFileName(e.target.files[0].name);
                                setPaper(e.target.files[0]);
                            } else {
                                alert("Only PDF are allowed");
                            }
                        }}
                    />
                    <div className='fileNameContain'>
                        <span className='fileName hide'>a</span>
                        <span className='fileName'>{fileName}</span>
                    </div>
                    <span className='browse'>Browse</span>
                </div>

                <div className='seperator' />

                <ReCAPTCHA
                    sitekey={process.env.REACT_APP_SITEKEY}
                    onChange={onRecaptchaChange}
                    ref={reRef}
                />

                <button className='submitBtn' disabled={!isVerifyied || isFetching} onClick={submit}>
                    <BeatLoader color={"#fff"} loading={isFetching} css={override} size={10} />
                    {!isFetching && "Submit"}
                </button>
            </div>
        </div>
    )
}

export default ApplyIdo;