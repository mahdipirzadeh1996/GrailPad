//const MetoToken = artifacts.require("MetoToken");
// const GrailToken = artifacts.require("GrailToken")
// const MetoToken = artifacts.require("MetoToken");
// const DaiToken = artifacts.require("DaiToken");
const TokenFarm = artifacts.require("TokenFarm");
// const RealGrailToken = artifacts.require("StandardERC20");
// const GrailTemp = artifacts.require("GrailTemp");

module.exports = async function(deployer, network, accounts) {
  //await deployer.deploy(MetoToken);

  // await deployer.deploy(DaiToken);
  // const daiToken = await DaiToken.deployed();

  //accepts multiple arguments, subsequent arguments are passed to the constructor
  // await deployer.deploy(MetoToken);
  // const metoToken = await MetoToken.deployed();
  
  await deployer.deploy(TokenFarm, '0xC03Ef412217E05B666744AD3b457734BBf7239F5');
  const tokenFarm = await TokenFarm.deployed();

  // await metoToken.transfer(tokenFarm.address, '1000000000000000000000000');
  
  //transfer some to an investor 100 DAI
  // await daiToken.transfer(accounts[1], '100000000000000000000');

  // await deployer.deploy(RealGrailToken);
  // await deployer.deploy(GrailTemp);
};
