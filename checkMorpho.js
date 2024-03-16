const { ethers } = require('ethers');

// This is a simplified ABI with only the getUserAccountData function - https://etherscan.io/address/0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb#code
// market, position, idToMarketParams
const abi = [
  "function idToMarketParams(bytes32) view returns (address loanToken, address collateralToken, address oracle, address irm, uint256 lltv)",
  "function market(bytes32) view returns (uint128 totalSupplyAssets, uint128 totalSupplyShares, uint128 totalBorrowAssets, uint128 totalBorrowShares, uint128 lastUpdate, uint128 fee)",
  "function position(bytes32, address) view returns (uint256 supplyShares, uint128 borrowShares, uint128 collateral)"
];

// get market IDs from https://risk.morpho.org/
const market_id = '0xc54d7acf14de29e0e5527cabd7a576506870346a78a11a6762e2cca66322ec41' //wstETH/WETH

const wallet = '0x38989BBA00BDF8181F4082995b3DEAe96163aC5D' //khaled

// You need to replace these placeholders with actual values
const INFURA_ID = '22a9f8b97d3f4452a560e1e048aecc4b'
const providerUrl = `https://mainnet.infura.io/v3/${INFURA_ID}`; //mainnet
const lendingPoolAddress = '0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb'; // Morpho Blue

// Initialize provider
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

// Initialize contract
const lendingPoolContract = new ethers.Contract(lendingPoolAddress, abi, provider);


//position
async function getPositionData(market_id, wallet) {
  try {
    const data = await lendingPoolContract.position(market_id, wallet);
    console.log('position')
    console.log(data);
;
  } catch (error) {
    console.error(error);
  }
}

// market
async function getMarketData(market_id) {
  try {
    const data = await lendingPoolContract.market(market_id);
    console.log('market')
    console.log(data);
;
  } catch (error) {
    console.error(error);
  }
}

//idToMarketParams
async function getMarketParams(market_id) {
  try {
    const data = await lendingPoolContract.idToMarketParams(market_id);
    console.log('idToMarketParams')
    console.log(data);
;
  } catch (error) {
    console.error(error);
  }
}
// Calculate Health Factor
// (borrowShares * total borrow assets) / total borrow shares = debt
// health factor = colateral * LTV / debt 

getPositionData(market_id, wallet);
getMarketData(market_id);
getMarketParams(market_id);


