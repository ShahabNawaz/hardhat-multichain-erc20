// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ValueCounter {
    uint256 private i;

    event CounterIncreased(uint256 newValue, address triggeredBy);

    function set() public {
        i += 1;
        emit CounterIncreased(i, msg.sender);
    }

    function get() public view returns (uint256) {
        return i;
    }
}
