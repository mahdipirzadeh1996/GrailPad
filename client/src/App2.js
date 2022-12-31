import React, { useState, useEffect, useCallback, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";
import { css } from "@emotion/react";
import { isMobile } from "react-device-detect";
import { ToastContainer } from 'react-toastify';

import Home from './pages/home/Home';
import Sidebar from './component/sidebar/Sidebar';
import Topbar from './component/topbar/Topbar';
import Staking from './pages/staking/Staking';
import GrailCalendar from './pages/calendar/GrailCalendar';
import Support from './pages/support/Support';
import Overview from './pages/ido/Overview';
import IdoPools from './pages/ido/IdoPools';
import ApplyIdo from './pages/ido/ApplyIdo';
import Footer from './component/footer/Footer';
import MoreDetails from './pages/ido/MoreDetails';
import AuthDialog from './component/authDialog/AuthDialog';
import EditDialog from './component/editDialog/EditDialog';
import WalletDialog from './component/walletDialog/WalletDialog';
import ManageIdo from './pages/manageIdo/ManageIdo';

import './App.css';
import { getWeb3 } from './web3-config';
import AppContext from './appContext';
import { checkGrailTokensFor } from './utils/assets';

import { AuthContext } from './context/authContext/AuthContext';
import { InvestorContext } from './context/investorContext/InvestorContext';
import { getAddress, insertAddress } from './context/investorContext/apiCalls';
import { TokenContext } from './context/tokenContext/TokenContext';
import { getToken, insertToken, updateToken } from './context/tokenContext/apiCalls';

import { getTokenFarmContractInstance } from './utils/assets';
import { getStakingBalanceOf } from './utils/tokenstaking.js';
import { SettingsPowerRounded } from '@material-ui/icons';

const override = css`
  display: block;
`;

const networks = {
    bscTest: {
        chainId: `0x${Number(97).toString(16)}`,
        chainName: "Binance Smart Chain Testnet",
        nativeCurrency: {
            name: "Binance Chain Native Token",
            symbol: "tBNB",
            decimals: 18
        },
        rpcUrls: [
            "https://data-seed-prebsc-1-s1.binance.org:8545",
            "https://data-seed-prebsc-2-s1.binance.org:8545",
            "https://data-seed-prebsc-1-s2.binance.org:8545",
            "https://data-seed-prebsc-2-s2.binance.org:8545",
            "https://data-seed-prebsc-1-s3.binance.org:8545",
            "https://data-seed-prebsc-2-s3.binance.org:8545"
        ],
        blockExplorerUrls: ["https://testnet.bscscan.com"]
    },
    polygon: {
        chainId: `0x${Number(137).toString(16)}`,
        chainName: "Polygon Mainnet",
        nativeCurrency: {
            name: "Matic Token",
            symbol: "MATIC",
            decimals: 18
        },
        rpcUrls: [
            "https://polygon-rpc.com",
            "https://rpc-mainnet.maticvigil.com",
            "https://rpc-mainnet.matic.network",
            "https://rpc-mainnet.matic.quiknode.pro"
        ],
        blockExplorerUrls: ["https://polygonscan.com"]
    },
    polygonTest: {
        chainId: `0x${Number(80001).toString(16)}`,
        chainName: "Polygon test",
        nativeCurrency: {
            name: "Matic Token",
            symbol: "MATIC",
            decimals: 18
        },
        rpcUrls: [
            "https://rpc-mumbai.matic.today",
            "https://matic-mumbai.chainstacklabs.com",
            "https://rpc-mumbai.maticvigil.com",
            "https://matic-testnet-archive-rpc.bwarelabs.com"
        ],
        blockExplorerUrls: ["https://mumbai.polygonscan.com"]
    }
}

let selectedAccount;

const App2 = () => {
    const [open, setOpen] = useState(true);

    const [web3, setWeb3] = useState();
    const [account, setAccount] = useState(null);
    const [networkId, setNetworkId] = useState(null);
    const [hasWalletAddress, setHasWalletAddress] = useState(false);
    const [hasAccountChanged, setHasAccountChanged] = useState(false);
    const [screenBlocked, setScreenBlocked] = useState(false);
    const [grailTokens, setGrailTokens] = useState(0);
    const [auth, setAuth] = useState(false);
    const [edit, setEdit] = useState(false);
    const [wallet, setWallet] = useState(false);
    const [locktime, setLocktime] = useState(null);
    const [grailStaked, setGrailStaked] = useState(null);
    const [tokenFarmContract, setTokenFarmContract] = useState(undefined);

    const { user } = useContext(AuthContext);
    const { investor, dispatch } = useContext(InvestorContext);
    const { token, dispatchh } = useContext(TokenContext);

    // console.log(window.ethereum.networkVersion)
    // useEffect(() => {
    //     getWeb3(0).then((webb3) => setWeb3(webb3))
    // }, []);

    useEffect(() => {
        if (user && !isMobile) {
            // handleNetworkSwitch('bscTest');
            // !isMobile && init();
            getAddress(user, dispatch);
            getToken(user, dispatchh);
        }
    }, [user]);

    useEffect(() => {
        window.ethereum.on("chainChanged", networkChanged);

        return () => {
            window.ethereum.removeListener("chainChanged", networkChanged);
        };
    }, []);

    useEffect(() => {
        if (web3) {
            // handleNetworkSwitch('bscTest');
            // !isMobile && init();
        }
    }, [web3]);

    useEffect(async () => {
        window.ethereum.on('changeChained', netChange);

        return () => {
            window.ethereum.removeListener('chainChanged', netChange);
        }
    }, []);

    const netChange = (chainId) => {
        console.log(chainId);
    }

    // useEffect(() => {
    //     if (token !== null) {
    //         switch (token[0].network) {
    //             case '97':
    //                 getWeb3('97');
    //                 break;
    //             case '137':
    //                 getWeb3('137');
    //                 break;
    //             case '80001':
    //                 getWeb3('80001');
    //                 break;
    //         }
    //     }
    // }, [token]);

    const handleTokensChange = useCallback(async () => {
        if (networkId) {
            const grailToken = web3 !== null && await checkGrailTokensFor(web3, account, networkId);
            setGrailTokens(grailToken);
        }
    }, [account, networkId]);

    useEffect(() => {
        (async () => {
            //it could happen that account is empty when this useEffect runs initially, hence the guard
            if (account) {
                handleTokensChange();
            }
        })();
    }, [account, handleTokensChange]);

    useEffect(() => {
        if (web3 !== null && networkId !== null) {
            const tokenFarmContract = getTokenFarmContractInstance(web3, networkId);
            setTokenFarmContract(tokenFarmContract);
        }
    }, [web3, networkId]);

    useEffect(() => {
        (async () => {
            if (account && tokenFarmContract) {
                const timeOfStaking = await tokenFarmContract.methods.timeOfStakingFor(account).call();
                setLocktime(timeOfStaking);
                setGrailStaked(await getStakingBalanceOf(account, web3, networkId));
            }
        })()
    }, [account, tokenFarmContract]);

    useEffect(() => {
        if (investor === null) {
            if (account) {
                console.log(account)
                insertAddress(account, user, dispatch);
            }
        } else {
            let temp = 0;
            for (let i = 0; i < investor.length; i++) {
                if (investor[i].address === String(account).toLowerCase()) {
                    temp = 1;
                }
            }

            if (temp === 0) {
                console.log(temp)
                if (account && grailStaked && locktime) {
                    insertAddress(account, user, dispatch);
                }
            }
        }

        user && getToken(user, dispatchh);
        if (investor === null) {
            if (account && grailStaked && locktime) {
                insertToken(grailTokens / 10 ** 18, networkId, user, account, dispatchh);
            }
        } else {
            let temp = 0;

            if (token !== null) {
                for (let i = 0; i < token.length; i++) {
                    if (token[i].address === String(account).toLowerCase() && token[i].network === String(networkId)) {
                        if (token[i].balance === String(grailTokens / 10 ** 18)) {
                            temp = 1;
                        } else if (token[i].balance !== String(grailTokens / 10 ** 18)) {
                            temp = 2;
                        }
                    }
                }

                if (temp === 0) {
                    if (grailTokens && networkId && account) {
                        insertToken(grailTokens / 10 ** 18, networkId, user, account, dispatchh);
                    }
                } else if (temp === 2) {
                    if (grailTokens && networkId && account) {
                        updateToken(grailTokens / 10 ** 18, networkId, user, account, dispatchh);
                    }
                }
            } else if (token === null) {
                if (grailTokens && networkId && account) {
                    insertToken(grailTokens / 10 ** 18, networkId, user, account, dispatchh);
                }
            }
        }
    }, [grailStaked]);

    const init = async () => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
                selectedAccount = accounts[0];
                //console.log(`Selected account is ${selectedAccount}`);

                //balance(String(selectedAccount));
                setAccount(accounts[0])
            }).catch(e => console.log(e));

            const network = await web3.eth.net.getId();
            setNetworkId(network);

            // setAccount(web.utils.toChecksumAddress(selectedAccount));

            window.ethereum.on('accountsChanged', (accounts) => {
                setHasAccountChanged(true);
                if (!accounts[0]) {
                    setHasWalletAddress(false);
                } else {
                    setHasWalletAddress(true);
                    setAccount(accounts[0]);
                }
            });
            // window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
            window.ethereum.on('chainChanged', (_chainId) => {
                switch (parseInt(_chainId)) {
                    case 97: {
                        getWeb3('97');
                        setNetworkId(String(parseInt(_chainId)))
                        break;
                    }
                    case 137: {
                        getWeb3('137');
                        setNetworkId(String(parseInt(_chainId)))
                        break;
                    }
                    case 80001: {
                        getWeb3('80001');
                        setNetworkId(String(parseInt(_chainId)))
                        break;
                    }
                    default: {
                        getWeb3('97');
                        setNetworkId('97')
                        break;
                    }
                }
            });
        } else {
            alert("Install Metamask")
        }
    };

    const handleBlockScreen = (blocked) => {
        setScreenBlocked(blocked);
    };

    const handleAccountChanged = (newHasAccountChanged) => {
        setHasAccountChanged(newHasAccountChanged);
    };

    const handleNetworkSwitch = async (networkName) => {
        await changeNetwork({ networkName });
    }

    const networkChanged = (chainId) => {
        console.log(parseInt(chainId));

        if (parseInt(chainId) !== 97 || parseInt(chainId) !== 137 || parseInt(chainId) !== 80001) {
            alert('Please select correct network!!!');
        }
    }

    useEffect(() => {
        if (web3 !== undefined) {
            currectNet();
            // switch (networkName) {
            //     case 'bscTest':
            //         if (await web3.eth.net.getId() === 97) {
            //             alert('OK')
            //         }
            //         break;
            //     case 'polygonTest':
            //         console.log(await web3.eth.net.getId())
            //         if (await web3.eth.net.getId() === 80001) {
            //             alert('OK')
            //         }
            //         break;
            // }
            // changeNetwork();
        }
    }, [web3])

    const currectNet = async () => {
        switch (await web3.eth.net.getId()) {
            case 97:
                changeNetwork('bscTest');
                break;
            case 80001:
                changeNetwork('polygonTest');
                break;
        }
    }

    const changeNetwork = async (networkName) => {
        try {
            if (!window.ethereum) throw new Error('No crypto wallet found');
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    ...networks[networkName]
                }]
            }).then(async () => {
                console.log(networkName)
                switch (networkName) {
                    case 'bscTest':
                        if (await web3.eth.net.getId() === 97) {
                            alert('OK')
                        }
                        setNetworkId(await web3.eth.net.getId())
                        break;
                    case 'polygonTest':
                        console.log(await web3.eth.net.getId())
                        if (await web3.eth.net.getId() === 80001) {
                            alert('OK')
                        }
                        setNetworkId(await web3.eth.net.getId())
                        break;
                }
            })
            // init();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        !isMobile ?
            <AppContext.Provider value={{
                web3,
                handleBlockScreen,
                screenBlocked,
                account,
                hasWalletAddress,
                hasAccountChanged,
                handleAccountChanged,
                handleTokensChange,
                networkId,
                grailTokens,
                grailStaked,
                investor
            }}>
                <Router>
                    <Switch>
                        <div className="container">
                            <div className='loading' style={{ display: screenBlocked ? 'flex' : 'none' }}>
                                <DotLoader color={"#fff"} loading={screenBlocked} css={override} size={60} />
                                <h3 className='loadTitle'>Waiting for transaction to finish...</h3>
                            </div>
                            <Topbar open={open} setOpen={setOpen} setAuth={setAuth} setEdit={setEdit} setWallet={setWallet} />
                            <Footer open={open} />
                            <Sidebar open={open} />
                            {/* <button onClick={() => handleNetworkSwitch('bscTest')} style={{ position: 'absolute', right: 0, top: '50%', zIndex: 1000 }}>test</button> */}

                            {auth ?
                                <AuthDialog setAuth={setAuth} />
                                :
                                null}

                            {edit ?
                                <EditDialog setEdit={setEdit} />
                                :
                                null}

                            {wallet ?
                                <WalletDialog setWallet={setWallet} handleNetworkSwitch={handleNetworkSwitch} setWeb3={setWeb3} />
                                :
                                null}

                            <Route
                                exact
                                path="/"
                                render={() => {
                                    return (
                                        <Redirect to="/home" />
                                    )
                                }}
                            />
                            <Route path="/home">
                                <Home open={open} />
                            </Route>
                            <Route path="/staking">
                                <Staking open={open} setAuth={setAuth} />
                            </Route>
                            <Route path="/calendar">
                                <GrailCalendar open={open} />
                            </Route>
                            <Route path="/support">
                                <Support open={open} />
                            </Route>
                            <Route path="/overview">
                                <Overview open={open} />
                            </Route>
                            <Route path="/idopools">
                                <IdoPools open={open} />
                            </Route>
                            <Route path="/applyforido">
                                <ApplyIdo open={open} />
                            </Route>
                            <Route path="/moreDetails">
                                <MoreDetails open={open} />
                            </Route>
                            <Route path="/manageIdo">
                                <ManageIdo open={open} />
                            </Route>
                        </div>
                    </Switch>
                </Router>
                <ToastContainer />
            </AppContext.Provider>
            :
            <div className='mob'>
                Oops please open website in desktop
            </div>
    );
}

export default App2;