const {network, ethers} = require("hardhat");
const { networkConfig, developmentChains } = require("../helper-hh-config")
const {verify} = require("../utils/verify")

module.exports.default = async({deployments,getNamedAccounts})=>{
    let chainId
    const {deploy,log} = deployments;
    const {deployer} = await getNamedAccounts();

    chainId = network.config.chainId
    const address = networkConfig[chainId].contract;
    const args = [address]
    let busdH
    log('***********Deploying Contract************')
    if (developmentChains.includes(network.name)) {
        const token = await ethers.getContract("BUSD");
        busdH = await deploy("BUSDHandler", {
            from: deployer,
            args: [token.address],
            log: true,
        })
    } else {
        busdH = await deploy("BUSDHandler", {
            from: deployer,
            args: args,
            log: true,
        })
    }
    
    log(`Contract deployed at ${busdH.address}`)
    if(!developmentChains.includes(network.name)){
        log("verifying.................")
        await verify(busdH.address,args)
    }
    log("-------------------------------------------------------")
}
 