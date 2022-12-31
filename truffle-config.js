const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 7545,
      network_id: '*'
    },
    testnet: {
      networkCheckTimeout: 10000, 
      provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-2-s3.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 2000,
      skipDryRun: true
    }, 
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.matic.today`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    rinkby: {
      networkCheckTimeout: 10000, 
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`),
      network_id: 4,
      confirmations: 2,
      timeoutBlocks: 2000,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "0.7.6"
    }
  }
};
