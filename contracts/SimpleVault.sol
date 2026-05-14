// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SimpleVault {

    IERC20 public token;
    uint256 public rate = 100000; 
    address public owner; 

    struct Stake {
        uint256 amount;
        uint256 startTime;
        uint256 lockEnd;
        bool withdrawn;
    }

    mapping(address => Stake) public stakes;

   constructor(address tokenAddress) {
        token = IERC20(tokenAddress);
        owner = msg.sender; 
    }

function deposit(uint256 amount, uint256 lockEndTime) external {
    require(amount > 0, "Invalid amount");
    require(stakes[msg.sender].amount == 0, "Already staked");
    require(lockEndTime > block.timestamp, "Invalid lock time");

    token.transferFrom(msg.sender, address(this), amount);

    stakes[msg.sender] = Stake({
        amount: amount,
        startTime: block.timestamp,
        lockEnd: lockEndTime,
        withdrawn: false
    });
}

    function calculateReward(address user) public view returns (uint256) {
        Stake memory s = stakes[user];

        if (s.amount == 0) return 0;

        uint256 duration = block.timestamp - s.startTime;

        uint256 reward = (s.amount * rate * duration) / (365 days * 100);

        return reward;
    }

modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call");
        _;
    }
    
    function withdraw(address user) external onlyOwner {
    Stake storage s = stakes[user];

    require(s.amount > 0, "No stake");
    require(block.timestamp >= s.lockEnd, "Still locked");
    require(!s.withdrawn, "Already withdrawn");

    uint256 reward = calculateReward(user);
    uint256 total = s.amount + reward;

    s.withdrawn = true;
    s.amount = 0;

    token.transfer(user, total);
}


    function getStake(address user) external view returns (uint256 amount, uint256 reward) {
        amount = stakes[user].amount;
        reward = calculateReward(user);
    }
}