// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenCaller {

    function getBalance(address token, address user)
        external
        view
        returns (uint256)
    {
        return IERC20(token).balanceOf(user);
    }
    function transferToken(
    address token,
    address to,
    uint256 amount
) external {
    IERC20(token).transferFrom(msg.sender, to, amount);
}
}






























  // function transferToken(address token, address to, uint256 amount)
    //     external
    // {
    //     IERC20(token).transfer(to, amount);
    // }