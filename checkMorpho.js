const { ethers } = require('ethers');

// This is a simplified ABI with only the getUserAccountData function
// market, position, idToMarketParams
const lendingPoolAbi = [
  "function getUserAccountData(address user) external view returns (uint256 totalCollateralETH, uint256 totalDebtETH, uint256 availableBorrowsETH, uint256 currentLiquidationThreshold, uint256 ltv, uint256 healthFactor)"
];

// https://etherscan.io/address/0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb#code - converted to this by chatGPT, only useful functions left here
const abi = [
  "function idToMarketParams(bytes32) view returns (address loanToken, address collateralToken, address oracle, address irm, uint256 lltv)",
  "function market(bytes32) view returns (uint128 totalSupplyAssets, uint128 totalSupplyShares, uint128 totalBorrowAssets, uint128 totalBorrowShares, uint128 lastUpdate, uint128 fee)",
  "function position(bytes32, address) view returns (uint256 supplyShares, uint128 borrowShares, uint128 collateral)"
];


const wallet = '0xc79B1DE842fdef5C197B9A5c37a97aa3d7cf9835' //khaled

// You need to replace these placeholders with actual values
const INFURA_ID = '22a9f8b97d3f4452a560e1e048aecc4b'
const providerUrl = `https://mainnet.infura.io/v3/${INFURA_ID}`; //mainnet
const lendingPoolAddress = '0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb'; // Morpho Blue

// Initialize provider
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

// Initialize contract
const lendingPoolContract = new ethers.Contract(lendingPoolAddress, lendingPoolAbi, provider);

async function getUserAccountData(userAddress) {
  try {
    const data = await lendingPoolContract.getUserAccountData(userAddress);
    console.log(data);
    // Destructure the data if you want to use individual values
    const { totalCollateralETH, totalDebtETH, availableBorrowsETH, currentLiquidationThreshold, ltv, healthFactor } = data;
    console.log(`Total Collateral ETH: ${totalCollateralETH}`);
    console.log(`Total Debt ETH: ${totalDebtETH}`);
    console.log(`Available Borrows ETH: ${availableBorrowsETH}`);
    console.log(`Current Liquidation Threshold: ${currentLiquidationThreshold}`);
    console.log(`LTV: ${ltv}`);
    console.log(`Health Factor: ${healthFactor}`);
  } catch (error) {
    console.error(error);
  }
}

// Replace 'USER_ADDRESS' with the actual user address
getUserAccountData(wallet);
