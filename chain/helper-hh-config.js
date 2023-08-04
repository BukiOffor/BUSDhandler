const networkConfig = {
    5: {
        name: "goerli",
        contract : "0x6FBed897995A96E42874F3E103793e67726888E1",
    },
    31337: {
        name: "hardhat",
        contract : "0x29F636D7cBDd0bDe2Ff13cCec74FcC3aAFEeDAc3",
    },
    11155111: {
        name: "sepolia",
        contract : "0x29F636D7cBDd0bDe2Ff13cCec74FcC3aAFEeDAc3",
    }

    
}

const frontEndContractsFile = "../client/constants/contractAddresses.json"
const frontEndAbiFile = "../client/constants/busdh.json"
const developmentChains = ["hardhat",'localhost']

module.exports = {
    developmentChains,
    frontEndContractsFile,
    frontEndAbiFile,
    networkConfig
}