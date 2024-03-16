const { ethers } = require('ethers');

// This is a simplified ABI with only the getUserAccountData function
const lendingPoolAbi = [
  "function getUserAccountData(address user) external view returns (uint256 totalCollateralETH, uint256 totalDebtETH, uint256 availableBorrowsETH, uint256 currentLiquidationThreshold, uint256 ltv, uint256 healthFactor)"
];

const wallet = '0x43C4A8E635862508e2F42f1Eb1182163ab873b33' //klarka

// contract addresses: https://docs.aave.com/developers/deployed-contracts/v3-mainnet
// implement Aave AddressBook? https://github.com/bgd-labs/aave-address-book/

// You need to replace these placeholders with actual values
const INFURA_ID = '22a9f8b97d3f4452a560e1e048aecc4b'
const providerUrl = `https://optimism-mainnet.infura.io/v3/${INFURA_ID}`; //optimism
const lendingPoolAddress = '0x794a61358D6845594F94dc1DB02A252b5b4814aD';

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
