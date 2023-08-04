const {ethers} = require("hardhat")

async function main() {

    const privateKey = process.env.pk
    const rpc = process.env.rpc
    const rpc_url = 'https://eth-goerli.g.alchemy.com/v2/JUd33W6MxjKFCz0rLRrFrsCTpdsXLPZk'
    const pk = "dca53f92ea49c2a28c46b97c1e5c75439d2a2864ce31fcdeae94a4515ad71192"
    const goerlicontract = "0xae36AE127B6FF95BBd835e3084Ec34A35707A9C2"
    
    const provider = new ethers.providers.JsonRpcProvider(rpc_url)   
    const wallet = new ethers.Wallet(pk, provider)

    const busdh = "0x8c0AD1834319bb1099a8c339C0cFbEeDf0137422";

    const receipt = await wallet.sendTransaction({
        to: goerlicontract,
        value: ethers.utils.parseEther("0.01"),
        gasLimit: 50000
    })

    console.log(receipt)
    

}

main().catch((error)=>{
    console.log(error)
})