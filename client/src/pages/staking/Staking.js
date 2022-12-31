import React, { useEffect, useState, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import '../../../node_modules/react-toastify/dist/ReactToastify.css';
import moment from 'moment';

import './staking.scss';
import AppContext from '../../appContext';
import {
    getStakersNumber, getStakingBalanceOf
} from '../../utils/tokenstaking.js';
import {
    getTokenFarmContractInstance,
    getGrailTokenContractInstance,
    convertToWei
} from '../../utils/assets';
import Countdown2 from '../landingPage/components/sections/partials/Countdown2';
import StakeDialog from '../../component/stakeDialog/StakeDialog';

import { AuthContext } from '../../context/authContext/AuthContext';
import { TransactionContext } from '../../context/transactionContext/TransactionContext';
import { insertTransaction } from '../../context/transactionContext/apiCalls';
import { TokenContext } from '../../context/tokenContext/TokenContext';
import { updateX } from '../../context/tokenContext/apiCalls';

const Staking = ({ open, auth, setAuth }) => {
    const { web3, account, networkId, handleBlockScreen, handleTokensChange, grailTokens } = useContext(AppContext);
    const { user } = useContext(AuthContext);
    const { dispatch } = useContext(TransactionContext);
    const { dispatchh } = useContext(TokenContext);

    const [grl, setGrl] = useState({
        grail: 0,
        graillp: 0
    });
    const [xGrl, setXGrl] = useState(0);
    const [xGrlLP, setXGrlLP] = useState(0);
    const [stakedTokens, setStakedTokens] = useState('');
    const [stakingBalance, setStakingBalance] = useState(0);
    const [stakersNumber, setStakerNumber] = useState(0);
    const [isDisabled, setIsDisabled] = useState(true);
    const [tokenFarmContract, setTokenFarmContract] = useState(undefined);
    const [grailTokenContract, setGrailTokenContract] = useState(undefined);
    const [timeOfStaking, setTimeOfStaking] = useState(undefined);

    const [isOpen, setIsOpen] = useState(false);

    const regExFloatStrict = /^([0-9]*[.])?[0-9]+$/;

    function handleChange(e) {
        setGrl({ ...grl, [e.target.name]: e.target.value });
    }

    function onSubmit(e) {
        e.preventDefault();

        const re = /^[0-9\b]+$/;

        if (grl.grail === '') {
            setGrl({ ...grl, ['grail']: 0 });
        }
        if (grl.graillp === '') {
            setGrl({ ...grl, ['graillp']: 0 });
        }
        if (re.test(grl.locktime)) {
            if (grl.locktime / 90 >= 1 && grl.grail !== 0) {
                setXGrl(grl.grail);
            } else if (grl.locktime / 90 < 1 && grl.grail !== 0) {
                setXGrl(grl.locktime / 90 * grl.grail);
            }
            if (grl.locktime / 90 >= 1 && grl.graillp !== 0) {
                setXGrlLP(grl.graillp * 2.25);
            } else if (grl.locktime / 90 < 1 && grl.graillp !== 0) {
                setXGrlLP(grl.locktime / 90 * grl.graillp * 2.25);
            }
        } else {
            alert('Please enter lock time!');
        }

        //(((xGrl + xGrlLP) % 1 ) === 0 ? xGrl + xGrlLP : (xGrl + xGrlLP).toFixed(1))
        console.log(Math.trunc(xGrl) + ' / ' + xGrl)
        console.log(xGrlLP)


        // if ((re.test(grl.grail) || re.test(grl.grail)) && re.test(grl.locktime)) {
        //     if (grl.graillp !== 0 && grl.grail !== 0) {
        //         if (grl.locktime / 90 >= 1 && grl.grail !== 0) {
        //             setXGrl(grl.grail);
        //             setXGrlLP(grl.graillp * 2.25);
        //         } else if (grl.locktime / 90 < 1 && grl.grail !== 0) {
        //             setXGrl(grl.locktime / 90 * grl.grail);
        //             setXGrlLP(grl.locktime / 90 * grl.graillp * 2.25);
        //         }
        //     } else if (grl.graillp !== 0) {
        //         if (grl.locktime / 90 >= 1 && grl.grail !== 0) {
        //             setXGrl(grl.grail);
        //         } else if (grl.locktime / 90 < 1 && grl.grail !== 0) {
        //             setXGrl(grl.locktime / 90 * grl.grail);
        //         }
        //     } else if (rl.grail !== 0) {
        //         if (grl.locktime / 90 >= 1 && grl.grail !== 0) {
        //             setXGrl(grl.grail);
        //         } else if (grl.locktime / 90 < 1 && grl.grail !== 0) {
        //             setXGrl(grl.locktime / 90 * grl.grail);
        //         }
        //     } 
        // } else {
        //     alert('Please enter number!');
        // }
    }

    useEffect(() => {
        (async () => {
            if (web3 !== null && networkId !== null) {
                setStakingBalance(await getStakingBalanceOf(account, web3, networkId))
                setStakerNumber(await getStakersNumber(web3, networkId))
                if (stakedTokens !== '' && regExFloatStrict.test(stakedTokens)) {
                    setIsDisabled(false)
                } else {
                    setIsDisabled(true)
                }
            }
        })();
    }, [web3, regExFloatStrict, stakedTokens, account, networkId]);

    useEffect(() => {
        if (web3 !== null) {
            const tokenFarmContract = getTokenFarmContractInstance(web3);
            setTokenFarmContract(tokenFarmContract);
            setGrailTokenContract(getGrailTokenContractInstance(web3, networkId));
        }
    }, [web3]);

    useEffect(() => {
        (async () => {
            if (account && tokenFarmContract) {
                const timeOfStaking = await tokenFarmContract.methods.timeOfStakingFor(account).call();
                setTimeOfStaking(timeOfStaking)
            }
        })()
    }, [account, tokenFarmContract]);

    const handleSubmitStake = async (weeks) => {
        handleBlockScreen(true)
        const stakedAmountInWei = convertToWei(stakedTokens, web3)

        try {
            await grailTokenContract.methods.approve(tokenFarmContract._address, stakedAmountInWei).send({ from: account, gas: '2000000' }).on('receipt', async (txReceiptApproved, err) => {
                try {
                    await tokenFarmContract.methods.stakeTokens(stakedAmountInWei, weeks).send({ from: account, gas: '2000000' })
                        .on('receipt', async (txReceiptStaked) => {
                            console.log("OK")
                            handleBlockScreen(false);
                            handleTokensChange();
                            insertTransaction('Grail staking transaction', txReceiptStaked.transactionHash, txReceiptStaked.from, process.env.REACT_APP_TOKEN_FARM_ADDRESS, "GrailTest", (txReceiptStaked.gasUsed * web3.utils.fromWei((await web3.eth.getGasPrice()), 'ether')).toFixed(5), new Date(), txReceiptStaked.status, user, account, dispatch);
                            updateX(stakedTokens, await tokenFarmContract.methods.timeOfStakingFor(account).call(), getXGrail(), getPhase(), user, account, networkId, dispatchh);
                            console.log(`Successfully staked! You paid ${(txReceiptApproved.gasUsed * web3.utils.fromWei((await web3.eth.getGasPrice()), 'ether')).toFixed(5)} ether for the approval
                        and ${(txReceiptStaked.gasUsed * web3.utils.fromWei((await web3.eth.getGasPrice()), 'ether')).toFixed(5)} ether for the staking.`);

                            setTimeOfStaking(await tokenFarmContract.methods.timeOfStakingFor(account).call());

                            toast.success(`Successfully staked! You paid ${(txReceiptApproved.gasUsed * web3.utils.fromWei((await web3.eth.getGasPrice()), 'ether')).toFixed(5)} ether for the approval
                                    and ${(txReceiptStaked.gasUsed * web3.utils.fromWei((await web3.eth.getGasPrice()), 'ether')).toFixed(5)} ether for the staking.`, {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        });
                } catch (err) {
                    console.log(err);
                    handleBlockScreen(false);
                    if (!err.code) {
                        console.log(err)
                        const temp = JSON.parse(String(err).substr(48));
                        insertTransaction('Grail staking transaction', temp.transactionHash, temp.from, process.env.REACT_APP_TOKEN_FARM_ADDRESS, "GrailTest", (temp.gasUsed * web3.utils.fromWei((await web3.eth.getGasPrice()), 'ether')).toFixed(5), new Date(), temp.status, user, account, dispatch);
                    }
                    toast.error('Could not withdraw. Either tx cancelled or something went wrong with the withdrawing.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            });

        } catch (err) {
            handleBlockScreen(false);
            toast.error('Could not stake. Either tx cancelled or something went wrong with the staking.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }

    const handleSubmitWithdraw = async () => {
        if (timeOfStaking && parseFloat(stakingBalance) > 0) {
            handleBlockScreen(true)
            const stakedAmountInWei = convertToWei(stakedTokens, web3)
            try {
                await tokenFarmContract.methods.withdrawTokens(stakedAmountInWei).send({ from: account, gas: '2000000' })
                    .on('receipt', async (txReceiptWithdrawn) => {
                        handleBlockScreen(false);
                        handleTokensChange();
                        insertTransaction('Withdraw transaction', txReceiptWithdrawn.transactionHash, process.env.REACT_APP_TOKEN_FARM_ADDRESS, txReceiptWithdrawn.from, "GrailTest", (txReceiptWithdrawn.gasUsed * web3.utils.fromWei((await web3.eth.getGasPrice()), 'ether')).toFixed(5), new Date(), txReceiptWithdrawn.status, user, account, dispatch);
                        updateX(0, 0, 0, 0, user, account, networkId, dispatchh);
                        toast.success(`Successfully unstaked ${stakedTokens} tokens! You paid ${(txReceiptWithdrawn.gasUsed * web3.utils.fromWei((await web3.eth.getGasPrice()), 'ether')).toFixed(5)} ether for the withdrawing.`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    });
            } catch (err) {
                handleBlockScreen(false)
                if (!err.code) {
                    console.log(err)
                    const temp = JSON.parse(String(err).substr(48));
                    insertTransaction('Withdraw transaction', temp.transactionHash, process.env.REACT_APP_TOKEN_FARM_ADDRESS, temp.from, "GrailTest", (temp.gasUsed * web3.utils.fromWei((await web3.eth.getGasPrice()), 'ether')).toFixed(5), new Date(), temp.status, user, account, dispatch);
                }
                toast.error('Could not withdraw. Either tx cancelled or something went wrong with the withdrawing.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else if (parseFloat(stakingBalance) === 0) {
            toast.error(`You don't have any staked token!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error(`The time of staking is not over yet!${stakingBalance}`, {
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

    const renderWithdrawButtonOrCountdown = () => {
        if (timeOfStaking) {
            const timeTillDate = moment.unix(parseInt(timeOfStaking)).add(1, 'minutes').format('MM DD YYYY, h:mm a');
            const diff = moment(timeTillDate, 'MM DD YYYY, h:mm a').diff(moment());

            return (
                diff > 0 ?
                    <Countdown2
                        timeTillDate={timeTillDate}
                        timeFormat="MM DD YYYY, h:mm a"
                    />
                    :
                    <div className='withdraw'>
                        <button
                            className='innerTempBtn'
                            disabled={isDisabled}
                            onClick={handleSubmitWithdraw}
                            style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}>
                            Withdraw GRAIL Tokens
                        </button>
                    </div>
            )
        }
    }

    const checkUser = (e) => {
        e.preventDefault();

        if (user) {
            setIsOpen(true);
        } else {
            setAuth(true);
        }
    };

    const getXGrail = () => {
        const timeTillDate = moment.unix(parseInt(timeOfStaking)).add(1, 'minutes').format('MM DD YYYY, h:mm a');
        const diff = moment(timeTillDate, 'MM DD YYYY, h:mm a').diff(moment());

        let xGrail = 0;
        if (diff > 0) {
            const then = moment(timeTillDate, "MM DD YYYY, h:mm a")
            const now = moment()
            const countdown = moment.duration((then.diff(now)))
            const weeks = countdown.asWeeks();

            if ((weeks / 52.1429) >= 0.25) {
                xGrail = stakingBalance;
            } else if ((weeks / 52.1429) < 0.25) {
                xGrail = (weeks / 52.1429) * 4 * stakingBalance;
            }
        }

        return xGrail;
    }

    const getPhase = () => {
        let phase = 0;

        if (getXGrail() <= 30000) {
            phase = 5;
        } else if (getXGrail() <= 60000) {
            phase = 4;
        } else if (getXGrail() <= 100000) {
            phase = 3;
        } else if (getXGrail() <= 150000) {
            phase = 2;
        } else if (getXGrail() <= 2000000) {
            phase = 1;
        }

        return phase;
    }

    return (
        <>
            <div className='staking' style={{ marginLeft: open ? '17rem' : '5vw' }}>
                <div className='header'>
                    <h2>Staking</h2>
                </div>
                <div className='grlMiddleStk'>
                    <div className='grlCalc' style={{ flex: 0.5, marginRight: '30px' }}>
                        <div className='grlInfo'>
                            <span className='span'>Details</span>
                            <span className='address' style={{ fontSize: '5px' }}>{account}</span>
                        </div>

                        <div className='seperator' />

                        <div className='grlInfo'>
                            <span className='span'>GRAIL Balance</span>
                            <span className='span'>{grailTokens / 10 ** 18}</span>
                        </div>

                        <div className='seperator' />

                        <div className='grlInfo'>
                            <span className='span'>Total number of stakers</span>
                            <span className='span'>{stakersNumber}</span>
                        </div>

                        <div className='seperator' />

                        <div className='grlInfo'>
                            <span className='span'>Total Staked</span>
                            <span className='span'>{stakingBalance}</span>
                        </div>

                        <div className='seperator' />

                        <div className='grlInfo'>
                            <span>xGRAIL Balance</span>
                        </div>
                    </div>

                    <div className='grlCalc'>
                        <div className='grlCalcLabel'>
                            <h4>xGRAIL Calculator</h4>
                        </div>

                        <div className='seperator' />

                        <div className='grlBlncCalc'>
                            <div className='inputContainer'>
                                <div className='topicContainer'>
                                    <span>GRAIL</span>
                                </div>
                                <div className='inp'>
                                    <input name={'grail'} type={'number'} pattern="[0-9]*" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='inputContainer'>
                                <div className='topicContainer'>
                                    <span>GRAIL-LP</span>
                                </div>
                                <div className='inp'>
                                    <input name={'graillp'} type={'number'} pattern="[0-9]*" onChange={handleChange} />
                                </div>
                            </div>

                            <div className='seperator' />

                            <div className='inputContainer'>
                                <div className='topicContainer'>
                                    <span>Lock Time (Days)</span>
                                </div>
                                <div className='inp'>
                                    <input name={'locktime'} type={'number'} pattern="[0-9]*" onChange={(handleChange)} />
                                </div>
                            </div>
                        </div>

                        <div className='seperator' />

                        <div className='tknCalcBlnc'>
                            <span>xGRAIL recived: {(xGrl === 0 && xGrlLP === 0) ? '-' : Math.trunc(parseFloat(xGrl) + parseFloat(xGrlLP))}</span>
                            {/* <span>xGRAIL-LP recived: {xGrlLP === 0 ? 'XXXXXXX' : xGrlLP}</span> */}
                            <div className='inputContainer' onClick={onSubmit}>
                                Calculate
                            </div>
                        </div>
                    </div>
                </div>

                <div className='stakePart'>
                    <div className='temp'>
                        <div className='innerTemp' style={{ flex: 0.3 }}>
                            <div className='title'>
                                NETWORK
                            </div>
                            <div className='func'>
                                Bsc.
                            </div>
                        </div>
                        <div className='innerTemp'>
                            <div className='title'>
                                GRAIL AMOUNT
                            </div>
                            <div className='func'>
                                <div className='inp'>
                                    <input name={'grailammount'} type={'number'} pattern="[0-9]*" onChange={(e) => setStakedTokens(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className='innerTemp' style={{ flex: 0.2 }}>
                            <div className='title'>
                                APY
                            </div>
                            <div className='func'>
                                -
                            </div>
                        </div>
                        <div className='innerTemp' style={{ flex: 0.5, borderRightWidth: '1.5px' }}>
                            <div className='title'>
                                ACTION
                            </div>
                            <div className='func'>
                                <button
                                    className='innerTempBtn'
                                    onClick={checkUser}
                                    disabled={isDisabled}
                                    style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}>
                                    Stake
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {renderWithdrawButtonOrCountdown()}
                {!auth && <ToastContainer />}
            </div>
            {isOpen ?
                <StakeDialog onClick={handleSubmitStake} setIsOpen={setIsOpen} />
                :
                null}
        </>
    )
}

export default Staking;