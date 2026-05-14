// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract SetGet {

    event Set(uint256);
    event Update(uint256);
    event TestReturns(string, bool, uint256, address, Status);

    enum Status {
        Active, 
        Completed,
        Stuck
    }

    Status public status;

    uint256 public x; 

    function set(uint256 _x) public {
        x = _x;
        emit Set(x);
    }

    function get() public view returns(uint256){
        return x;
    }

    function update(uint256 _x)  public {
        x = _x;
        emit Update(x);
    }

    function testReturns() public {
        x = x+1;
        emit TestReturns("testString", true, x, msg.sender, Status.Stuck);
    }

    struct User{
        string name;
        uint256 age;
    }

    mapping(uint256 => User) userMapping;
    function setUser(User memory user, uint id)  public{
        userMapping[id] = user;
    }

    function setMultipleUser(User[] memory users, uint[] memory ids) public {
        uint i;
        for(i=0;i<users.length;i++){
            userMapping[ids[i]] = users[i];
        }
    }

    function getUser(uint id) public returns(User memory){
        return userMapping[id];
    }
}