import React, { useState, useContext } from 'react';
import {
    Home,
    BusinessCenter,
    HeadsetMic,
    ArrowForwardIos,
    MonetizationOn,
    GridOn
} from "@material-ui/icons";
import { Link } from "react-router-dom";

import './sidebar.css';
import { AuthContext } from '../../context/authContext/AuthContext';

const Sidebar = ({ open }) => {
    const [current, setCurrent] = useState(window.location.pathname === '/' ? '/home' : window.location.pathname);
    const { user } = useContext(AuthContext);

    return (
        <div className={open ? "sidebar" : "sidebar sidebarClose"}>
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <ul className={open ? "sidebarList" : 'sidebarList close'}>
                        <Link to="/home" className="link" onClick={() => setCurrent('/home')}>
                            <li className={open ? (current === '/home' ? "sidebarListItem active" : "sidebarListItem") : (current === '/home' ? "sidebarListItem active close" : "sidebarListItem close")}>
                                <Home className={open ? "sidebarIcon" : 'sidebarIcon close'} />
                                <span style={{ display: open ? 'block' : 'none' }}>
                                    Home
                                </span>
                            </li>
                        </Link>
                        <div className="link" onClick={() => setCurrent('/ido')}>
                            <li className={open ? (current === '/ido' || current === '/overview' || current === '/idopools' || current === '/applyforido' ? "sidebarListItem active" : "sidebarListItem") : (current === '/ido' || current === '/overview' || current === '/idopools' || current === '/applyforido' ? "sidebarListItem active close" : "sidebarListItem close")}>
                                <MonetizationOn className={open ? "sidebarIcon" : 'sidebarIcon close'} />
                                <span style={{ display: open ? 'block' : 'none' }}>
                                    IDO
                                </span>
                                <div className={current === '/ido' ? 'test open' : 'test'} style={{ display: open ? 'block' : 'none' }}>
                                    <ArrowForwardIos style={{ fontSize: '0.8rem' }} />
                                </div>
                            </li>
                        </div>
                        <div className={current === '/ido' || current === '/overview' || current === '/idopools' || current === '/applyforido' ? 'ido open' : 'ido'}>
                            <Link className="link" to="/overview" onClick={() => setCurrent('/overview')}>
                                <li className={current === '/overview' ? "sidebarIdo active" : "sidebarIdo"}>
                                    <div className='dot' />
                                    Overview
                                </li>
                            </Link>
                            <Link className="link" to="/idopools" onClick={() => setCurrent('/idopools')}>
                                <li className={current === '/idopools' ? "sidebarIdo active" : "sidebarIdo"}>
                                    <div className='dot' />
                                    IDO Pools
                                </li>
                            </Link>
                            <Link className="link" to="/applyforido" onClick={() => setCurrent('/applyforido')}>
                                <li className={current === '/applyforido' ? "sidebarIdo active" : "sidebarIdo"}>
                                    <div className='dot' />
                                    Apply for IDO
                                </li>
                            </Link>
                        </div>
                        {/* <Link to="/calendar" className="link" onClick={() => setCurrent('/calendar')}>
                            <li className={open ? (current === '/calendar' ? "sidebarListItem active" : "sidebarListItem") : (current === '/calendar' ? "sidebarListItem active close" : "sidebarListItem close")}>
                                <EventNote className={open ? "sidebarIcon" : 'sidebarIcon close'} />
                                <span style={{ display: open ? 'block' : 'none' }}>
                                    Calendar
                                </span>
                            </li>
                        </Link> */}
                        <Link to="/staking" className="link" onClick={() => setCurrent('/staking')}>
                            <li className={open ? (current === '/staking' ? "sidebarListItem active" : "sidebarListItem") : (current === '/staking' ? "sidebarListItem active close" : "sidebarListItem close")}>
                                <BusinessCenter className={open ? "sidebarIcon" : 'sidebarIcon close'} />
                                <span style={{ display: open ? 'block' : 'none' }}>
                                    Staking Pools
                                </span>
                            </li>
                        </Link>
                        <Link to="/support" className="link" onClick={() => setCurrent('/support')}>
                            <li className={open ? (current === '/support' ? "sidebarListItem active" : "sidebarListItem") : current === '/support' ? "sidebarListItem active close" : "sidebarListItem close"}>
                                <HeadsetMic className={open ? "sidebarIcon" : 'sidebarIcon close'} />
                                <span style={{ display: open ? 'block' : 'none' }}>
                                    Support
                                </span>
                            </li>
                        </Link>
                        {user ?
                            user.email === 'support@grailpad.io' ?
                                <Link to="/manageIdo" className="link" onClick={() => setCurrent('/support')}>
                                    <li className={open ? (current === '/manageIdo' ? "sidebarListItem active" : "sidebarListItem") : current === '/manageIdo' ? "sidebarListItem active close" : "sidebarListItem close"}>
                                        <GridOn className={open ? "sidebarIcon" : 'sidebarIcon close'} />
                                        <span style={{ display: open ? 'block' : 'none' }}>
                                            Ido forms
                                        </span>
                                    </li>
                                </Link>
                                :
                                null
                            :
                            null}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;