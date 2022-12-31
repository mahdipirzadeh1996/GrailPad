import {
    getTokenFarmContractInstance
} from './assets'

export const getStakersNumber = async (web3, netId) => {
    const tokenFarmContract = getTokenFarmContractInstance(web3, netId);
    const stakersArray = await tokenFarmContract.methods.getStakers().call();
    return stakersArray.length
}

export const getStakingBalanceOf = async (account, web3, netId) => {
    if (account) {
        const tokenFarmContract = getTokenFarmContractInstance(web3, netId)
        const stakingBalance = await tokenFarmContract.methods.stakingBalance(account).call()
        return web3.utils.fromWei(stakingBalance, 'ether')
    } return 0
}