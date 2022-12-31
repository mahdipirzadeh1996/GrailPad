import React, { useState } from 'react';
import { Close } from "@material-ui/icons";

import './stakeDialog.scss';

const StakeDialog = ({ onClick, setIsOpen }) => {
    const [week, setWeek] = useState(1)
    return (
        <div className='stakeDialog'>
            <div className='main'>
                <div className='header'>
                    <h2>Staking Locktime</h2>
                </div>
                <div className='seperator' />

                <input
                    type="range"
                    min={1}
                    max={52}
                    step={1}
                    value={week}
                    onChange={event => {
                        setWeek(event.target.valueAsNumber)
                    }}
                />

                <h1>Week: {week}</h1>

                <button
                    className='startStake'
                    onClick={() => onClick(week)}>
                    Start Staking
                </button>

                <button
                    onClick={() => setIsOpen(false)}
                    className='close'>
                    <Close className='closeIcon' />
                </button>
            </div>
        </div>
    )
}

export default StakeDialog;