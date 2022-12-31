import React from 'react';
import { Link } from "react-router-dom";

import './overview.scss';
import logo from '../../images/LOGO-Final-e1636643001227.png';

const Overview = ({ open }) => {
    return (
        <div className='overview' style={{ marginLeft: open ? '17rem' : '5vw' }}>
            <div className='header'>
                <h2>Overview</h2>
            </div>
            <div className='mainPart'>
                <div className='temp'>
                    <div className='innerTemp'>
                        <div className='title'>
                            PROJECT NAME
                        </div>
                        <div className='func'>
                            <img src={logo} alt="" className="logo" />
                            Grailpad
                        </div>
                    </div>
                    <div className='innerTemp'>
                        <div className='title'>
                            TICKER
                        </div>
                        <div className='func'>
                            GRAIL
                        </div>
                    </div>
                    <div className='innerTemp'>
                        <div className='title'>
                            TOTAL RAISE
                        </div>
                        <div className='func'>
                            TBA
                        </div>
                    </div>
                    <div className='innerTemp'>
                        <div className='title'>
                            IDO PRICE
                        </div>
                        <div className='func'>
                            0.02$
                        </div>

                    </div>
                    <div className='innerTemp'>
                        <div className='title'>
                            ROI
                        </div>
                        <div className='func'>
                            -
                        </div>
                    </div>
                    <div className='innerTemp'>
                        <div className='title'>
                            DETAILS
                        </div>
                        <div className='func'>
                            <button
                                className='innerTempBtn'>
                                <Link to="/moreDetails" className="link">
                                    <div className='submit'>
                                        Details
                                    </div>
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview;