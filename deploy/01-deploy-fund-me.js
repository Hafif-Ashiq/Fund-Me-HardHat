// function deployFunc(){
//     console.log(`Hi!!`);
// }
// module.exports.default = deployFunc

const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
// require("dotenv").config();
const { verify } = require("../utils/verify")
// const {getNamedAccounts,deployments} = hre;
// => hre.getNamedAccounts && hre.deployment

// module.exports = async (hre) => {
//     const {getNamedAccounts,deployments} = hre;

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    log(chainId)

    let ethUsdPriceFeedAddress

    log("--------In Deploy-Fund-Me.js---------")

    if (developmentChains.includes(network.name)) {
        const ethV3Aggregator = await get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethV3Aggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    log(ethUsdPriceFeedAddress.toString())

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
    }

    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, //put Pricefeed
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log("-------------------------------------------------")

    await verify(fundMe.address, args)
}

module.exports.tags = ["all", "fundme"]
