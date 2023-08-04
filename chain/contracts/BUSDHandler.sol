// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract BUSDHandler {
    
    error InsufficientBalance();
    error TransactionFailed();
    event TransactionSuccesful(address indexed sender, address indexed receiver, uint256 indexed amount );
    
    address owner;
    IERC20 busd;

    /**
     * 
     * @param _contractaddress the contract address of the ERC20 token
     */
    constructor(address _contractaddress){
        busd = IERC20(_contractaddress);
        owner = msg.sender;
    }

    /**
     * @dev this function presumes an approval has already been made
     * @param value amount of token to be transferred
     * @param receiver the receiver of the token
     */
    function proxyTransfer(uint value, address receiver) external {
        bool success = busd.transferFrom(msg.sender,receiver, value);       
        if(success){
            emit TransactionSuccesful(msg.sender,receiver,value);
        }
    }
    
    /**
     * This function takes the address of an owner and whatever address t
     * hat was approved to spend and returns allowance
     * @param _owner the address of the owner
     * @param receiver the address of the spender
     */
    function allowance(address _owner, address receiver) external view returns(uint amount) {
        amount = busd.allowance(_owner, receiver);
    }
    
    //receive ether to process transactions
    receive()external payable{

    }

    /**
     * can only be called by the deployer of this contract
     * withdraws the balance of this contract
     */
    function withdraw()external{
        if(msg.sender == owner){
            (bool sent, )=owner.call{value:address(this).balance}("");
            if(!sent){revert TransactionFailed() ;}
        }
    }

    /** returns the token balance of the msg.sender */
    function getBalance()external view returns(uint balance){
        balance = busd.balanceOf(msg.sender);
    }

}