import React, { useContext, useState, useEffect } from "react";
import { Search, Redeem, Notifications, Message, AccountBalanceWallet, Edit } from "@material-ui/icons";

import "./topbar.scss";
import logo from '../../images/LOGO-Final-e1636643001227.png';
import walletAvtr from '../../images/wallet_avatar.png';
import AppContext from '../../appContext'
import { AuthContext } from '../../context/authContext/AuthContext';

export default function Topbar({ open, setOpen, setAuth, setEdit, setWallet }) {
    const { account, investor, networkId } = useContext(AppContext);
    const { user } = useContext(AuthContext);

    const [isMenu, setIsMenu] = useState(false);
    const [net, setNet] = useState(0);

    useEffect(() => {
        switch (networkId) {
            case 97:
                setNet('BSC');
                break;
            case 137:
                setNet('Polygon');
                break;
            case 1:
                setNet('Ethereum');
                break;
            case 43114:
                setNet('Avalanche');
                break;
            case 80001:
                setNet('PolygonTest');
                break;
        }
    }, [networkId])

    return (
        <div className="topbar">
            <div className={open ? "left" : "left leftClose"}>
                <img src={logo} alt="" className={open ? "logo" : 'logo close'} />
                <h1>{open ? 'GrailPad' : ''}</h1>
            </div>
            <div className="middle">
                <div className="btnContainer">
                    <button className={"btn"} onClick={() => setOpen(!open)}>
                        <div className={open ? "first" : "firstClose"} />
                        <div className={open ? "second" : "secondClose"} />
                        <div className={open ? "third" : "thirdClose"} />
                    </button>
                </div>
                <div className="inputContainer">
                    <div className="inp">
                        <input type={'text'} placeholder="Find something here..." />
                        <Search className="menu" />
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="func">
                    <Notifications className="menu" />
                </div>
                <div className="func">
                    <Message className="menu" />
                </div>
                <div className="func">
                    <Redeem className="menu" />
                </div>
                {user ?
                    <div className="func" onClick={() => setEdit(true)}>
                        <Edit className="menu" />
                    </div>
                    :
                    null
                }
                <div className="walletContainer">
                    <div className="func" style={{ backgroundColor: '#cccccc' }}>
                        <AccountBalanceWallet className="menu" style={{ color: 'var(--back)' }} onClick={() => setIsMenu(!isMenu)} />
                        <div className="dropMenu" style={{ display: isMenu ? 'flex' : 'none' }}>
                            {user ?
                                <div className="dropContain">
                                    <h3>{user.email}</h3>
                                    {account === null || account === '' ?
                                        <span onClick={() => setWallet(true)}>Please connect your wallet!</span>
                                        :
                                        investor !== null ?
                                            investor.map((item, index) => (
                                                <div className="addressContain" key={index} onClick={() => alert(item.address)}>
                                                    <div className="imgContain">
                                                        <img src={walletAvtr} alt='' />
                                                        <div className="light" style={{ backgroundColor: String(item.address).toLowerCase() === String(account).toLowerCase() ? 'green' : 'var(--btnBack)' }} />
                                                    </div>
                                                    <h4>{item.address}</h4>
                                                </div>
                                            ))
                                            :
                                            null
                                    }
                                </div>
                                :
                                <button className="authBtn" onClick={() => setAuth(true)}>
                                    Please Login / Register
                                </button>
                            }
                        </div>
                    </div>
                    <div className="walletInfo">
                        <h4>{(account === '' || account === null) ? "Connect Wallet" : net}</h4>
                        {/* <span>NetworkID: {networkId}</span> */}
                    </div>
                </div>
            </div>
        </div >
    );
}
