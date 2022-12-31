import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

// const getWeb3 = async () => {
//     let web3;
//     if (typeof window !== 'undefined' && window.ethereum !== 'undefined') {
//         /**
//          * We are in the browser and metasmask is running
//          */
//         console.log("METAMASK RUNNING");
//         const provider = await detectEthereumProvider();
//         console.log(provider)
//         web3 = new Web3(provider);

//     } else {
//         /**
//          * We are not running Metamask
//          * --> create our own provider and wire it up with web3
//          */

//         const provider = new Web3.providers.HttpProvider(
//             // 'https://rinkeby.infura.io/v3/ad6c5b3aa2854ff2845f842c4e308077'
//             // 'http://127.0.0.1:7545'
//             'https://data-seed-prebsc-1-s1.binance.org:8545'
//         );

//         web3 = new Web3(provider);
//     }
//     return web3;
// };



export const getWeb3 = (netId) => {
    let web3;
    let temp;

    const bscProvider = new Web3.providers.HttpProvider(
        'https://data-seed-prebsc-1-s1.binance.org:8545'
    );
    const polygonProvider = new Web3.providers.HttpProvider(
        'https://polygon-rpc.com'
    );
    const polygonTestProvider = new Web3.providers.HttpProvider(
        'https://rpc-mumbai.matic.today'
    );

    switch (String(netId)) {
        case '97':
            web3 = new Web3(bscProvider);
            temp = 'bscTest';
            break;
        case '137':
            web3 = new Web3(polygonProvider);
            break;
        case '80001':
            web3 = new Web3(polygonTestProvider);
            temp = 'polygonTest';
            break;
        default:
            web3 = new Web3(bscProvider);
            temp = 'bscTest';
            break;
    }

    return (web3);
}