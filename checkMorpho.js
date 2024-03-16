const { Contract, JsonRpcProvider, formatUnits } = require('ethers');

// This is a simplified ABI with only the getUserAccountData function - https://etherscan.io/address/0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb#code
// market, position, idToMarketParams
const abi = [
  "function idToMarketParams(bytes32) view returns (address loanToken, address collateralToken, address oracle, address irm, uint256 lltv)",
  "function market(bytes32) view returns (uint128 totalSupplyAssets, uint128 totalSupplyShares, uint128 totalBorrowAssets, uint128 totalBorrowShares, uint128 lastUpdate, uint128 fee)",
  "function position(bytes32, address) view returns (uint256 supplyShares, uint128 borrowShares, uint128 collateral)"
];

// get market IDs from https://risk.morpho.org/
const market_id = '0x698fe98247a40c5771537b5786b2f3f9d78eb487b4ce4d75533cd0e94d88a115' //weETH/WETH

const wallet = '0x357dfdC34F93388059D2eb09996d80F233037cBa' //user wallet

// You need to replace these placeholders with actual values
const INFURA_ID = '22a9f8b97d3f4452a560e1e048aecc4b'
const providerUrl = `https://mainnet.infura.io/v3/${INFURA_ID}`; //mainnet
const lendingPoolAddress = '0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb'; // Morpho Blue

// Initialize provider
const provider = new JsonRpcProvider(providerUrl);

// Initialize contract
const lendingPoolContract = new Contract(lendingPoolAddress, abi, provider);


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

// getPositionData(market_id, wallet);
// getMarketData(market_id);
// getMarketParams(market_id);


async function getValues(market_id, wallet) {
  try {
    const positionData = await lendingPoolContract.position(market_id, wallet);
    const marketData = await lendingPoolContract.market(market_id);
    const marketParams = await lendingPoolContract.idToMarketParams(market_id);
    
    const debt = (positionData.borrowShares * (marketData.totalBorrowAssets + 1n)) / (marketData.totalBorrowShares + 1000000n)
    const healthFactor = (positionData.collateral * marketParams.lltv) / debt

    // console.log('positionData==============================');
    // console.log(positionData);
    // console.log('marketData==============================');
    // console.log(marketData);
    // console.log('marketParams==============================');
    // console.log(marketParams);
    
    console.log('values ==============================');
    console.log(`Wallet: ${wallet}`);
    console.log(`Debt: ${formatUnits(debt, 18)}`);
    console.log(`healthFactor: ${ formatUnits(healthFactor, 18) }`);

;
  } catch (error) {
    console.error(error);
  }
}

getValues(market_id, wallet);