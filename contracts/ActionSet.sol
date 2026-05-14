// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract ActionSet {
    event ActionSetValue(uint256 value);

    function actionSet(uint256 _value) public {
        emit ActionSetValue(_value);
    }
}