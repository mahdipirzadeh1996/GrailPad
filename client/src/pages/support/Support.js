import React, { useState, useRef } from 'react';
import Select from 'react-select';
import ReCAPTCHA from "react-google-recaptcha";

import './support.scss';

const options = [
    { value: 1, label: 'Staking' },
    { value: 2, label: 'IDO Pools' },
    { value: 3, label: 'xGrail' },
    { value: 4, label: 'Aooly for IDO' },
    { value: 5, label: 'Tier System' },
    { value: 6, label: 'Other' },
];

export default function Support({ open }) {
    const [selectedOption, setSelectedOption] = useState('1');
    const [isVerifyied, setIsVerified] = useState(false);

    const reRef = useRef();

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            outline: 0,
            cursor: 'pointer',
            backgroundColor: "#002a4c", 
            color: state.isSelected ? "#6d7c7d" : "#a095a4",
            "&:hover": {
                color: '#6d7c7d'
            }
        }),
        menu: (base, state) => ({
            ...base,
            width: '300px',
            marginRight: '100px',
            borderStyle: 'solid',
            borderWidth: '2.5px',
            borderColor: '#002a4c',
            backgroundColor: "#002a4c"
        }),
        control: (base, state) => ({
            ...base,
            border: 'none',
            background: "#002a4c",
            boxShadow: "none",
            cursor: 'pointer',
            fontSize: '20px',
        }),
        placeholder: (base, state) => ({
            ...base,
            color: 'white',
        }),
        singleValue: (base, state) => ({
            ...base,
            color: 'white',
        })
    }

    const onChange = (value) => {
        console.log('Captch value: ', value)
        setIsVerified(true);
    }

    return (
        <div className='support' style={{ marginLeft: open ? '17rem' : '5vw' }}>
            <div className='header'>
                <h2>Support</h2>
            </div>

            <div className='mainAbout'>
                <div className='aboutLabel'>
                    <span>Wallet Address</span>
                </div>
                <div className='aboutInput'>
                    <input placeholder='Enter Your Wallet Address' className='inp' name={'grail'} type={'text'} />
                </div>
                <div className='seperator' />
                <div className='aboutLabel'>
                    <span>Email Address</span>
                </div>
                <div className='aboutInput'>
                    <input placeholder='Enter Your Email Address' className='inp' name={'grail'} type="email" />
                </div>
                <div className='seperator' />
                <div className='aboutLabel'>
                    <span>Category</span>
                </div>
                <div className='aboutInput'>
                    <button className='idnBtn' style={{ justifyContent: 'left' }}>
                        <Select
                            placeholder={"Choose your question category"}
                            styles={customStyles}
                            value={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                        />
                    </button>
                </div>
                <div className='seperator' />
                <div className='aboutLabel'>
                    <span>Question</span>
                </div>
                <div className='questionInp'>
                    <textarea placeholder='Enter Your Question' className='inp' name={'grail'} type={'text'} />
                </div>
                <div className='seperator' />
                <ReCAPTCHA
                    sitekey={process.env.REACT_APP_SITEKEY}
                    onChange={onChange}
                    size='invisible'
                    ref={reRef}
                />
                <button className='inputContainer' disabled={!isVerifyied}>
                    Submit
                </button>
            </div>
        </div>
    )
}