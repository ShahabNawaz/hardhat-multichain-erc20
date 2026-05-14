// SPDX-License-Identifier: MIT
// // // import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// // // import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// // // contract TimeLockStaking is ReentrancyGuard {
// // //     IERC20 public stakingToken;
    
// // //     // APR in basis points (e.g., 1000 = 10% APY)
// // //     uint256 public constant RATE_DIVISOR = 10000;
// // //     uint256 public constant SECONDS_IN_YEAR = 365 days;

// // //     struct Stake {
// // //         uint256 amount;
// // //         uint256 startTime;
// // //         uint256 unlockTime;
// // //         bool active;
// // //     }

// // //     mapping(address => Stake) public stakes;

// // //     event Staked(address indexed user, uint256 amount, uint256 unlockTime);
// // //     event Withdrawn(address indexed user, uint256 amount, uint256 reward);

// // //     constructor(address _stakingToken) {
// // //         stakingToken = IERC20(_stakingToken);
// // //     }

// // //     // Stake tokens for a fixed period
// // //     function stake(uint256 _amount, uint256 _lockDurationSeconds) external nonReentrant {
// // //         require(_amount > 0, "Cannot stake 0");
// // //         require(!stakes[msg.sender].active, "Already staking");

// // //         stakes[msg.sender] = Stake({
// // //             amount: _amount,
// // //             startTime: block.timestamp,
// // //             unlockTime: block.timestamp + _lockDurationSeconds,
// // //             active: true
// // //         });

// // //         stakingToken.transferFrom(msg.sender, address(this), _amount);
// // //         emit Staked(msg.sender, _amount, stakes[msg.sender].unlockTime);
// // //     }

// // //     // Withdraw tokens and rewards after lock time
// // //     function withdraw() external nonReentrant {
// // //         Stake storage userStake = stakes[msg.sender];
// // //         require(userStake.active, "No active stake");
// // //         require(block.timestamp >= userStake.unlockTime, "Tokens are locked");

// // //         uint256 amount = userStake.amount;
        
// // //         // Profit = (x * y) * rate / 365d
// // //         // Note: Using 10% APR as an example.
// // //         uint256 reward = calculateReward(msg.sender);

// // //         userStake.active = false;
// // //         userStake.amount = 0;

// // //         stakingToken.transfer(msg.sender, amount + reward);
// // //         emit Withdrawn(msg.sender, amount, reward);
// // //     }

// // //     // Formula: (x * y) * rate / 365d
// // //     function calculateReward(address _user) public view returns (uint256) {
// // //         Stake memory userStake = stakes[_user];
// // //         if (!userStake.active) return 0;

// // //         // Ensure we don't calculate for more than 1 year
// // //         uint256 timeStaked = block.timestamp > userStake.unlockTime 
// // //             ? userStake.unlockTime - userStake.startTime 
// // //             : block.timestamp - userStake.startTime;
            
// // //         // Limit time factor to 365 days maximum for calculation
// // //         if (timeStaked > SECONDS_IN_YEAR) timeStaked = SECONDS_IN_YEAR;

// // //         // APR = 10% (1000/10000)
// // //         uint256 apr = 1000; 

// // //         // Profit = (amount * timeInSeconds * APR) / (SECONDS_IN_YEAR * RATE_DIVISOR)
// // //         return (userStake.amount * timeStaked * apr) / (SECONDS_IN_YEAR * RATE_DIVISOR);
// // //     }
// // // }



// `
// pragma solidity ^0.8.28;
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// contract stacking is ERC20 {
//     constructor() ERC20("Shahab", "SBN") {
//         _mint(msg.sender, 1000 * 10 ** decimals());
//     }

// }





// pragma solidity ^0.8.0;

// /**
//  * @dev Interface for the ERC20 standard as defined by OpenZeppelin
//  */
// interface IERC20 {
//     function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
//     function balanceOf(address account) external view returns (uint256);
// }

// contract TokenVault {
//     // Address of the specific ERC20 token this contract accepts
//     IERC20 public immutable token;

//     // Mapping to track deposited amounts for each user address
//     mapping(address => uint256) private _deposits;

//     constructor(address tokenAddress) {
//         token = IERC20(tokenAddress);
//     }

//     /**
//      * @notice Deposit tokens into the contract
//      * @dev User must call token.approve(this_contract_address, amount) first
//      * @param amount The number of tokens to deposit
//      */
//     function deposit(uint256 amount) external {
//         require(amount > 0, "Amount must be greater than 0");
        
//         // Transfer tokens from user to this contract
//         bool success = token.transferFrom(msg.sender, address(this), amount);
//         require(success, "Transfer failed");

//         // Update the internal ledger
//         _deposits[msg.sender] += amount;
//     }

//     /**
//      * @notice Get the total deposited amount for a specific user
//      * @param user The address of the user to check
//      * @return The amount of tokens deposited by the user
//      */
//     function getDepositAmount(address user) external view returns (uint256) {
//         return _deposits[user];
//     }
// }





// pragma solidity ^0.8.0;

// interface IERC20 {
//     function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
// }

// contract SimpleVault {

//     IERC20 public token;

//     mapping(address => uint256) private deposits;

//     constructor(address tokenAddress) {
//         token = IERC20(tokenAddress);
//     }

//     // 🔹 1. Deposit Token
//     function deposit(uint256 amount) external {
//         require(amount > 0, "Invalid amount");

//         bool success = token.transferFrom(msg.sender, address(this), amount);
//         require(success, "Transfer failed");

//         deposits[msg.sender] += amount;
//     }

//     // 🔹 2. Get User Deposit Balance
//     function getBalance(address user) external view returns (uint256) {
//         return deposits[user];
//     // }
// }
