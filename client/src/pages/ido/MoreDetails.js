import React, { useState } from 'react';
import { Twitter, YouTube, PictureAsPdf, PieChart, DescriptionOutlined, VideoFile, Signpost, Share } from '@mui/icons-material';

import './moreDetails.scss';
import logo from '../../images/LOGO-Final-e1636643001227.png';
import cover from '../../images/grailCover.png';

const MoreDetails = ({ open }) => {
    const [tab, setTab] = useState(1);

    const TabContext = () => {
        switch (tab) {
            case 1:
                return (
                    <div className='top'>
                        <h4>About GrailPad</h4>
                        <span style={{ color: 'var(--txtDark)' }}>
                            GrailPad is a permissionless DEX built for cross-chain token pools and auctions,
                            enabling projects to raise capital on a decentralized and interoperable environment
                            based on its own ecosystem. WithGrailPad , decentralized projects will be able to raise
                            and exchange capital cheap and fast. Users will be able to participate in asecure and
                            compliant environment and to use assets that go through our portal in BSC , Polygon ,
                            Solana , Ethereum and Avalanche.
                        </span>
                    </div>
                )
            case 2:
                return (
                    <div className='top'>
                        <h4>GrailPad Introduction Video</h4>
                    </div>
                )
            case 3:
                return (
                    <div className='top'>
                        <h4>This is icon title</h4>
                        <span style={{ color: 'var(--txtDark)' }}>
                            Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor.

                            Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor.
                        </span>
                    </div>
                )
        }
    }

    return (
        <div className='moreDetails' style={{ marginLeft: open ? '17rem' : '5vw' }}>
            <div className='header'>
                <div className='cover'>
                    <img className='coverImg' src={cover} alt='' />
                </div>
                <div className='temp'>
                    <div className='logoContain'>
                        <img src={logo} alt='' className='logo' />
                    </div>
                    <div className='titleContain'>
                        <h2>GrailPad</h2>
                        <h4>GRAIL</h4>
                    </div>
                    <div className='socialContain'>
                        <a className='tSocial' href={'http://twitter.com/GrailPad_io'} rel="noopener noreferrer" target="_blank">
                            <div className='titleContainer'>
                                Twitter
                            </div>
                            <div className='seperate' />
                            <div className='iconContain'>
                                <Twitter className='icon' />
                            </div>
                        </a>
                        <a className='ySocial' href={'http://grailpad.medium.com'} rel="noopener noreferrer" target="_blank">
                            <div className='titleContainer'>
                                Youtube
                            </div>
                            <div className='seperate' />
                            <div className='iconContain'>
                                <YouTube className='icon' />
                            </div>
                        </a>
                        <a className='mSocial' href={'http://grailpad.medium.com'} rel="noopener noreferrer" target="_blank">
                            <div className='titleContainer'>
                                Medium
                            </div>
                            <div className='seperate' />
                            <div className='iconContain'>
                                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous" />
                                <a target="_blank"><i class="fa fa-medium fa" aria-dden="true"></i></a>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className='main'>
                <div className='innerMainL'>
                    <div className='leftPrt'>
                        <div className='point' />
                        <div className='road' />
                        <div className='point' />
                        <div className='road' />
                        <div className='point' />
                        <div className='road' />
                        <div className='point' />
                    </div>
                    <div className='rightPrt'>
                        <div className='point'>
                            <h1>Pre-Launch</h1>
                            <span>Add your Wallet To whitelist</span>
                        </div>
                        <div className='step' />
                        <div className='point'>
                            <h1>Launch</h1>
                            <span>Buy your token in FCFS</span>
                        </div>
                        <div className='step' />
                        <div className='point'>
                            <h1>Launch Ends</h1>
                        </div>
                        <div className='step' />
                        <div className='point'>
                            <h1>Recieve Your Token</h1>
                        </div>
                    </div>
                </div>
                <div className='innerMainR'>
                    <div className='top'>
                        <h4>Pool Details</h4>
                    </div>
                    <div className='seperator' />
                    <div className='med'>
                        <span>Token Price:</span>
                        <span>0.02$</span>
                    </div>
                    <div className='med'>
                        <span>Pool Size:</span>
                        <span>400.000</span>
                    </div>
                    <div className='med'>
                        <span>Hard Cap:</span>
                        <span>1000 BNB</span>
                    </div>
                    <div className='med'>
                        <span>Soft Cap:</span>
                        <span>500 BNB</span>
                    </div>
                    <div className='med'>
                        <span>Type:</span>
                        <span>Public</span>
                    </div>
                </div>
            </div>
            <div className='end'>
                <div className='top'>
                    <h4>Pool Details</h4>
                </div>
                <div className='seperator' />
                <div className='med'>
                    <div className='section' onClick={() => setTab(1)}>
                        <DescriptionOutlined className='icon' />
                    </div>
                    <div className='section' onClick={() => setTab(2)}>
                        <VideoFile className='icon' />
                    </div>
                    <div className='section' onClick={() => setTab(3)}>
                        <PictureAsPdf className='icon' />
                    </div>
                    <div className='section' onClick={() => setTab(3)}>
                        <PieChart className='icon' />
                    </div>
                    <div className='section' onClick={() => setTab(3)}>
                        <Signpost className='icon' />
                    </div>
                    <div className='section' onClick={() => setTab(3)}>
                        <Share className='icon' />
                    </div>
                </div>
                <div className='seperator' />
                <div className='below'>
                    <TabContext />
                </div>
            </div>
        </div>
    )
}

export default MoreDetails;