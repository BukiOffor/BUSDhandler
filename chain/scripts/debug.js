const {ethers} = require("hardhat")

async function main() {

    const privateKey = process.env.pk
    const rpc = process.env.rpc
    
    const provider = new ethers.providers.JsonRpcProvider(rpc)   
    const wallet = new ethers.Wallet(privateKey, provider)

    const busdh = await ethers.getContractAt("BUSDHandler", "0xEe211B2A03Dd3Be29c9E2009609f24A1Dd3c4Cf7", wallet);

    const busd = await ethers.getContractAt("BUSD", "0x29F636D7cBDd0bDe2Ff13cCec74FcC3aAFEeDAc3", wallet);

    console.log(parseInt(await (busd.balanceOf(wallet.address))))
    
    const transaction = await busdh.proxyTransfer(BigInt(1e18), "0xf9808e0a01C513720e7878cF4Ca719ec53310fD8") 
    transaction.wait(1)
    console.log(transaction);
    const busd2 = await ethers.getContractAt("BUSD", "0x6FBed897995A96E42874F3E103793e67726888E1", wallet);

    console.log(parseInt(await (busd2.balanceOf('0xf9808e0a01C513720e7878cF4Ca719ec53310fD8'))))

    

}





main().catch((error)=>{
    console.log(error)
})