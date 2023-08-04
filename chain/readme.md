## Solidity Codebase

The Openzeppelin's ERC20 contracts has abstracted a lot of hassel in creating erc20 tokens and interacting with them. For this project i deployed a and verified a test token on sepolia because i could not find the bnb faucet. The test token uses ERC20 standard and can be found here <https://sepolia.etherscan.io/address/0x29F636D7cBDd0bDe2Ff13cCec74FcC3aAFEeDAc3> . I then used an IERC20 interface from openzeppelin to interact with the contract. In order to be more gas efficient, i decided to use the approve and transferFrom functions since we will be writing to storage lesser than a user transferring to the contract, then the contract transfering to a proxy. 

--
## Challenge
The challenge i had with this was a stupid one, because i forgot that when you make an outside call to another contract, the contract becauses the msg.sender and external caller becomes the tx.origin. so i tried to approve my contract for allowance but when i get the allowance mapping it returns 0.

I solved this by pulling the Approval event Logs, i looked at the topics and saw that my spender and owner were both my contract address.

## Set up
In terms of setup, there is nothing to do here much because the contracts have already been deployed and verified and sepolia. the contract address can be found here <https://sepolia.etherscan.io/address/0xe53D8e34CEBD7A31Cab71E35c398629e24440804> . Should you want to deploy the contract for test purposes run

```bash
npm install
#to deploy on hardhat local chain, add the --network <networkname> to deploy on a livenet
hh deploy
# this command will deploy a local blockchain node and deliver 20 prefunded accounts
hh node
```

### security

The security of the contract is tight in the sense that it does not give an attacker room for manipulaton. The contract will cease and revert once the allowance mapping of contract caller and contract address is less than the amount trying to access.
