const { frontEndContractsFile, frontEndAbiFile } = require("../helper-hh-config")
const fs = require("fs")
const { network } = require("hardhat")

let UPDATE_FRONT_END = true


module.exports = async () => {
    if (UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Front end written!")
    }
}

async function updateAbi() {
    const busdh = await ethers.getContract("BUSDHandler")
    fs.writeFileSync(frontEndAbiFile, busdh.interface.format(ethers.utils.FormatTypes.json))
}

async function updateContractAddresses() {
    const busdh = await ethers.getContract("BUSDHandler")
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    if (network.config.chainId.toString() in contractAddresses) {
        //incase the contract address of the network has changed
        if (!contractAddresses[network.config.chainId.toString()].includes(busdh.address)) {
            contractAddresses[network.config.chainId.toString()].push(busdh.address)
        }
    } else {
        contractAddresses[network.config.chainId.toString()] = [busdh.address]
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}
module.exports.tags = []