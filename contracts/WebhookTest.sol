// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract WebhookTest {

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Error: Only admin/owner can call this function");
        _;
    }

    event Set1(uint256);
    function set1(uint256 _x) public {
        emit Set1(_x);
    }

    event Set2(uint256);
    function set2(uint256 _x) public {
        emit Set2(_x);
    }

    event Set3(uint256);

    function set3(uint256 _x) public onlyOwner {
        emit Set3(_x);
    }
}