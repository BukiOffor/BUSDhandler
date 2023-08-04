const {ethers} = require("hardhat")

async function main() {

    const privateKey = process.env.pk
    const rpc = process.env.rpc
    const rpc_url = 'https://eth-goerli.g.alchemy.com/v2/JUd33W6MxjKFCz0rLRrFrsCTpdsXLPZk'
    const pk = "dca53f92ea49c2a28c46b97c1e5c75439d2a2864ce31fcdeae94a4515ad71192"
    const goerlicontract = "0xae36AE127B6FF95BBd835e3084Ec34A35707A9C2"
    
    const provider = new ethers.providers.JsonRpcProvider(rpc) 
    const wallet = new ethers.Wallet(privateKey, provider)

    const busdh = await ethers.getContractAt("BUSDHandler", "0xC42b9a2eD652c468B7B739956b632Ce40216E72d", wallet);
    const receipt = await busdh.proxyApprove(1e8)
    console.log(receipt)
    const response = await busdh.allowance(wallet.address, "0xC42b9a2eD652c468B7B739956b632Ce40216E72d" )
    console.log(parseInt(response))

    

}

main().catch((error)=>{
    console.log(error)
})