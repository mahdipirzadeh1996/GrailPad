import MetoToken from '../contracts/MetoToken.json';
import DaiToken from '../contracts/DaiToken.json';
import GralPolygon from '../contracts/GrailPolygon.json';
import TokenFarm from '../contracts/TokenFarm.json';
import TokenFarmPolygon from '../contracts/TokenFarmPolygon.json';

import GrailToken from '../contracts/GrailToken.json';

export const getMetoTokenContractInstance = (web3) => {
    return new web3.eth.Contract(
        MetoToken.abi,
        process.env.REACT_APP_METO_TOKEN_ADDRESS,
    );
};

export const getDaiTokenContractInstance = (web3) => {
    return new web3.eth.Contract(
        DaiToken.abi,
        process.env.REACT_APP_DAI_TOKEN_ADDRESS,
    );
};

export const getGrailTokenContractInstance = (web3, netId) => {
    switch (String(netId)) {
        case '97':
            return new web3.eth.Contract(
                GrailToken,
                process.env.REACT_APP_GRAIL_TOKEN_ADDRESS,
            )
        case '80001':
            return new web3.eth.Contract(
                GralPolygon.abi,
                process.env.REACT_APP_GRAIL_POLYGON,
            )
    }
}

export const getTokenFarmContractInstance = (web3, netId) => {
    switch (String(netId)) {
        case '97':
            return new web3.eth.Contract(
                TokenFarm.abi,
                process.env.REACT_APP_TOKEN_FARM_ADDRESS,
            );
        case '80001':
            return new web3.eth.Contract(
                TokenFarmPolygon.abi,
                process.env.REACT_APP_TOKEN_FARM_POLYGON_ADDRESS,
            );
    }
};

export const checkDaiTokensFor = async (web3, account) => {
    const daiContract = getDaiTokenContractInstance(web3);
    const daiTokensOfWalletAddress = await daiContract.methods.getBalanceOf(account).call();
    return daiTokensOfWalletAddress
}

export const checkGrailTokensFor = async (web3, account, netId) => {
    const grailContract = getGrailTokenContractInstance(web3, netId);
    const grailTokensOfWalletAddress = await grailContract.methods.balanceOf(account).call();
    return grailTokensOfWalletAddress
}

export const checkMetoTokensFor = async (web3, account) => {
    const metoContract = getMetoTokenContractInstance(web3);
    const metoTokensOfWalletAddress = await metoContract.methods.getBalanceOf(account).call();
    return metoTokensOfWalletAddress
}

export const convertToTokens = (n, web3) => {
    return web3.utils.fromWei(n, 'ether');
}

export const convertToWei = (n, web3) => {
    return web3.utils.toWei(n, 'ether');
}