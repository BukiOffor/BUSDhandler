const {network, ethers} = require("hardhat");
const { networkConfig, developmentChains } = require("../helper-hh-config")
const {verify} = require("../utils/verify")


module.exports.default = async({deployments,getNamedAccounts})=>{
    if (developmentChains.includes(network.name)) {

        const { deploy, log } = deployments;
        const { deployer } = await getNamedAccounts();
        chainId = network.config.chainId
        const args = [BigInt(10000000000000000000e18)]

        log('***********Deploying Contract************')
        const busd = await deploy("BUSD", {
            from: deployer,
            args: args,
            log: true,
        })
    
        log(`Contract deployed at ${busd.address}`)
        if (!developmentChains.includes(network.name)) {
            log("verifying.................")
            await verify(busd.address, args)
        }
        log("-------------------------------------------------------")
    }
}
 