// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BUSD is ERC20 {
    /**
     * 
     * @param initialSupply mints the total supply to the deployer
     */
    constructor(uint256 initialSupply) ERC20("BUSDHandler", "BUSD") {
        _mint(msg.sender, initialSupply);
    }

    
}
