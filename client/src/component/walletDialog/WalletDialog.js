import React, { useState } from 'react';
import { Close } from "@material-ui/icons";

import './walletDialog.scss';
import { getWeb3 } from '../../web3-config';
import phantom from '../../images/phantom.png';
import metamask from '../../images/metamask.png';

const networks = [
    {
        label: 'BSC',
        color: '#F0B90B'
    },
    {
        label: 'Polygon',
        color: '#8247e5'
    },
    {
        label: 'Ethereum',
        color: '#8c8c8c'
    },
    {
        label: 'Avalanche',
        color: '#e84142'
    },
]

const WalletDialog = ({ setWallet, handleNetworkSwitch, setWeb3 }) => {
    const [net, setNet] = useState(false);

    const handleNetwork = async (index) => {
        switch (index) {
            case 0:
                setWeb3(getWeb3('97'));
                // handleNetworkSwitch('bscTest');
                break;
            case 1:
                setWeb3(getWeb3('80001'));
                // handleNetworkSwitch('polygonTest');
                break;
            default:
                alert('Comming soon!');
                break;
        }
    }

    return (
        <div className='walletDialog'>
            <div className='main'>
                <button
                    onClick={() => setWallet(false)}
                    className='close'>
                    <Close className='closeIcon' />
                </button>
                <div className='header'>
                    <span>Select a Wallet to Connect to Grailpad</span>
                </div>
                <div className='walletContain'>
                    <div className='col'>
                        <div className='wallet' onClick={() => setNet(!net)}>
                            <img src={metamask} alt='' />
                            <span>Metamask</span>
                        </div>

                        <div className={net ? 'net open' : 'net'}>
                            {networks.map((item, index) => (
                                <div key={index} className='section' onClick={() => handleNetwork(index)}>
                                    <div className='colors'>
                                        <div
                                            style={{
                                                width: '15px',
                                                height: '15px',
                                                borderRadius: '7.5px',
                                                background: item.color
                                            }}
                                        />
                                    </div>


                                    <div className='labels'>
                                        <span>{item.label}</span>
                                    </div>
                                </div>
                            ))}

                            {/* <div className='labels'>
                                {labels.map((item, index) => (
                                    <span key={index}>{(index === 0 ? 'Bainance Smart Chain (' : '') + item + (index === 0 ? ')' : '')}</span>
                                ))}
                            </div> */}
                        </div>
                    </div>
                    <div className='col' style={{ marginLeft: '10px' }}>
                        <div className='wallet'>
                            <img src={phantom} alt='' />
                            <span>Phantom</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default WalletDialog;