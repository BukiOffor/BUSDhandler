require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("hardhat-gas-reporter");
require("@nomicfoundation/hardhat-chai-matchers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const goerli_rpc = process.env.goerli_rpc_url
const goerli_pk = process.env.goerli_pk
const api_key = process.env.api_key
const coinmarketcap = process.env.coinmarketcap
const privateKey = process.env.pk
const rpc = process.env.rpc

module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.17",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.8.0",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    defaultNetwork: "hardhat",
    networks: {
        
        hardhat: {
            forking: {
                url: rpc,
                blockNumber: 4012906
                ,
            },
            gasLimit: 3e10, // whatever you want here
            //allowUnlimitedContractSize: true
        },
        sepolia :{
            url: rpc,
            accounts: [privateKey],
            chainId: 11155111,
            blockConfirmations : 6
          },
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas_report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: coinmarketcap,
    },
    etherscan: {
        apiKey: api_key,
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        signer: {
            default: 1,
        },
        buyer: {
            default: 2,
        },
    },
}

