import React from 'react';

import './idoPools.scss';
import logo from '../../images/LOGO-Final-e1636643001227.png';
import { Link } from "react-router-dom";

const IdoPools = ({ open }) => {
    return (
        <div className='idopools' style={{ marginLeft: open ? '17rem' : '5vw' }}>
            <div className='header'>
                <h2>IDO Pools</h2>
            </div>
            <div className='main'>
                <div className='imgContain'>
                    <img src={logo} alt="" className="logo" />
                </div>
                <div className='content'>
                    <h2>GrailPad</h2>
                    <div className='seperator' />
                    <div className='coinLabel'>
                        <span className='label'>Total Raise: </span>
                        <span className='value'>TBA</span>
                    </div>
                    <div className='coinLabel'>
                        <span className='label'>Type: </span>
                        <span className='value'>Public</span>
                    </div>
                    <div className='coinLabel'>
                        <span className='label'>Network: </span>
                        <span className='value'>BSC , Polygun , Solana</span>
                    </div>
                    <div className='coinLabel'>
                        <span className='label'>Status: </span>
                        <span className='value'>Upcoming</span>
                    </div>
                    <div className='coinLabel'>
                        <span className='label'>GrailPad Empowers Launchpad Projects to Raise Liquidity in Affair and Decentralized Manner, Stake and Send Tokens Across Rollups</span>
                    </div>
                </div>
                <div className='submitContain'>
                    <Link to="/moreDetails" className="link">
                        <div className='submit'>
                            More Details
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default IdoPools;