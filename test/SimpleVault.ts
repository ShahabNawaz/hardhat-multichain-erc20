const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleVault - Full Test Suite", function () {
let token: any, vault: any;
let owner: any, user1: any, user2: any;

  const amount = ethers.parseEther("100");

  beforeEach(async () => {
    [owner, user1, user2] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("MyToken");
    token = await Token.deploy();

    const Vault = await ethers.getContractFactory("SimpleVault");
    vault = await Vault.deploy(token.target);

    await token.transfer(user1.address, amount);
    await token.transfer(user2.address, amount);
  });

  describe("Deposit", () => {

    it("should deposit with valid token amount", async () => {
      await token.connect(user1).approve(vault.target, amount);

      const future = (await ethers.provider.getBlock("latest")).timestamp + 1000;

      await vault.connect(user1).deposit(amount, future);

      const stake = await vault.stakes(user1.address);
      expect(stake.amount).to.equal(amount);
    });

    it("should fail for zero amount", async () => {
      await expect(
        vault.connect(user1).deposit(0, Date.now())
      ).to.be.revertedWith("Invalid amount");
    });

    it("should fail without approve", async () => {
      const future = (await ethers.provider.getBlock("latest")).timestamp + 1000;

      await expect(
        vault.connect(user1).deposit(amount, future)
      ).to.be.reverted;
    });

    it("should fail if amount > allowance", async () => {
      await token.connect(user1).approve(vault.target, ethers.parseEther("10"));

      const future = (await ethers.provider.getBlock("latest")).timestamp + 1000;

      await expect(
        vault.connect(user1).deposit(amount, future)
      ).to.be.reverted;
    });

    it("should fail if lockEndTime < current time", async () => {
      await token.connect(user1).approve(vault.target, amount);

      const past = (await ethers.provider.getBlock("latest")).timestamp - 1;

      await expect(
        vault.connect(user1).deposit(amount, past)
      ).to.be.revertedWith("Invalid lock time");
    });

    it("should fail if lockEndTime == current time", async () => {
      await token.connect(user1).approve(vault.target, amount);

      const now = (await ethers.provider.getBlock("latest")).timestamp;

      await expect(
        vault.connect(user1).deposit(amount, now)
      ).to.be.reverted;
    });

    it("should set startTime = block.timestamp", async () => {
      await token.connect(user1).approve(vault.target, amount);

      const future = (await ethers.provider.getBlock("latest")).timestamp + 1000;

      const tx = await vault.connect(user1).deposit(amount, future);
      const block = await ethers.provider.getBlock(tx.blockNumber);

      const stake = await vault.stakes(user1.address);
      expect(stake.startTime).to.equal(block.timestamp);
    });

    it("should transfer tokens to contract", async () => {
      await token.connect(user1).approve(vault.target, amount);

      const future = (await ethers.provider.getBlock("latest")).timestamp + 1000;

      await vault.connect(user1).deposit(amount, future);

      const balance = await token.balanceOf(vault.target);
      expect(balance).to.equal(amount);
    });

    it("should allow multiple users to deposit", async () => {
      await token.connect(user1).approve(vault.target, amount);
      await token.connect(user2).approve(vault.target, amount);

      const future = (await ethers.provider.getBlock("latest")).timestamp + 1000;

      await vault.connect(user1).deposit(amount, future);
      await vault.connect(user2).deposit(amount, future);

      expect((await vault.stakes(user1.address)).amount).to.equal(amount);
      expect((await vault.stakes(user2.address)).amount).to.equal(amount);
    });

    it("should prevent double deposit", async () => {
      await token.connect(user1).approve(vault.target, amount);

      const future = (await ethers.provider.getBlock("latest")).timestamp + 1000;

      await vault.connect(user1).deposit(amount, future);

      await expect(
        vault.connect(user1).deposit(amount, future)
      ).to.be.revertedWith("Already staked");
    });

    it("should allow deposit with +1 sec lock time", async () => {
  await token.connect(user1).approve(vault.target, amount);

  const future = (await ethers.provider.getBlock("latest")).timestamp + 5; 

  await vault.connect(user1).deposit(amount, future);

  const stake = await vault.stakes(user1.address);
  expect(stake.amount).to.equal(amount);
});
it("should deposit with approved token allowance", async () => {
  await token.connect(user1).approve(vault.target, amount);

  const future =
    (await ethers.provider.getBlock("latest")).timestamp + 1000;

  await vault.connect(user1).deposit(amount, future);

  const stake = await vault.stakes(user1.address);
  expect(stake.amount).to.equal(amount);
});
it("should deposit by passing a valid epoch timestamp as lockEndTime", async () => {
  await token.connect(user1).approve(vault.target, amount);

  const futureEpoch = (await ethers.provider.getBlock("latest")).timestamp + 1000;

  await vault.connect(user1).deposit(amount, futureEpoch);

  const stake = await vault.stakes(user1.address);
  expect(stake.amount).to.equal(amount);
  expect(stake.lockEnd).to.equal(futureEpoch);
});
it("should deposit with different valid future timestamps for lockEndTime", async () => {
  await token.connect(user1).approve(vault.target, amount);
  await token.connect(user2).approve(vault.target, amount);

  const future1 = (await ethers.provider.getBlock("latest")).timestamp + 500;
  const future2 = (await ethers.provider.getBlock("latest")).timestamp + 1000;

  await vault.connect(user1).deposit(amount, future1);
  let stake1 = await vault.stakes(user1.address);
  expect(stake1.amount).to.equal(amount);
  expect(stake1.lockEnd).to.equal(future1);

  await vault.connect(user2).deposit(amount, future2);
  let stake2 = await vault.stakes(user2.address);
  expect(stake2.amount).to.equal(amount);
  expect(stake2.lockEnd).to.equal(future2);
});

});

  describe("Reward", () => {

    it("should calculate reward with valid stake", async () => {
      await token.connect(user1).approve(vault.target, amount);

      const future = (await ethers.provider.getBlock("latest")).timestamp + 1000;

      await vault.connect(user1).deposit(amount, future);

      await ethers.provider.send("evm_increaseTime", [3600]);
      await ethers.provider.send("evm_mine");

      const reward = await vault.calculateReward(user1.address);
      expect(reward).to.be.gt(0);
    });

    it("should increase reward over time", async () => {
      await token.connect(user1).approve(vault.target, amount);

      const future = (await ethers.provider.getBlock("latest")).timestamp + 1000;

      await vault.connect(user1).deposit(amount, future);

      await ethers.provider.send("evm_increaseTime", [100]);
      await ethers.provider.send("evm_mine");

      const r1 = await vault.calculateReward(user1.address);

      await ethers.provider.send("evm_increaseTime", [100]);
      await ethers.provider.send("evm_mine");

      const r2 = await vault.calculateReward(user1.address);

      expect(r2).to.be.gt(r1);
    });

    it("should return 0 if no stake", async () => {
      const reward = await vault.calculateReward(user1.address);
      expect(reward).to.equal(0);
    });

    it("should calculate reward for multiple users", async () => {
      await token.connect(user1).approve(vault.target, amount);
      await token.connect(user2).approve(vault.target, amount);

      const future = (await ethers.provider.getBlock("latest")).timestamp + 1000;

      await vault.connect(user1).deposit(amount, future);
      await vault.connect(user2).deposit(amount, future);

      await ethers.provider.send("evm_increaseTime", [500]);
      await ethers.provider.send("evm_mine");

      const r1 = await vault.calculateReward(user1.address);
      const r2 = await vault.calculateReward(user2.address);

      expect(r1).to.be.gt(0);
      expect(r2).to.be.gt(0);
    });
    it("should calculate reward with large stake amount", async () => {
  const largeAmount = ethers.parseEther("500");

  await token.transfer(user1.address, largeAmount);

  await token.connect(user1).approve(vault.target, largeAmount);

  const future =
    (await ethers.provider.getBlock("latest")).timestamp + 1000;

  await vault.connect(user1).deposit(largeAmount, future);

  await ethers.provider.send("evm_increaseTime", [3600]);
  await ethers.provider.send("evm_mine");

  const reward = await vault.calculateReward(user1.address);

  expect(reward).to.be.gt(0);
});
it("should calculate reward matching expected formula", async () => {
  await token.connect(user1).approve(vault.target, amount);

  const future =
    (await ethers.provider.getBlock("latest")).timestamp + 1000;

  await vault.connect(user1).deposit(amount, future);

  const duration = 3600; // 1 hour
  await ethers.provider.send("evm_increaseTime", [duration]);
  await ethers.provider.send("evm_mine");

  const reward = await vault.calculateReward(user1.address);

  // expected formula
  const rate = await vault.rate();
  const expected =
  (amount * BigInt(rate) *BigInt(duration)) /
  (BigInt(365 * 24 * 60 * 60) * 100n);

  expect(reward).to.equal(expected);
});




it("should allow owner to successfully call withdraw", async () => {
  await token.connect(user1).approve(vault.target, amount);

  const future = (await ethers.provider.getBlock("latest")).timestamp + 100;
  await vault.connect(user1).deposit(amount, future);

  // Move time forward
  await ethers.provider.send("evm_increaseTime", [200]);
  await ethers.provider.send("evm_mine");

  // Fund vault with enough tokens
  const expectedReward = await vault.calculateReward(user1.address);
  const totalNeeded = amount + expectedReward;
  await token.transfer(owner.address, totalNeeded * 2n); // safe margin
  await token.connect(owner).transfer(vault.target, totalNeeded * 2n);

  // Withdraw
  await vault.connect(owner).withdraw(user1.address);

  // Check user balance with small tolerance
  const userBalance = await token.balanceOf(user1.address);
  expect(userBalance).to.be.closeTo(amount + expectedReward, ethers.parseEther("0.01"));
});
describe("Withdraw Functionality", () => {
  const amount = ethers.parseEther("100");

  beforeEach(async () => {
    // Approve and deposit for user1
    const futureTime = (await ethers.provider.getBlock("latest")).timestamp + 100;
    await token.connect(user1).approve(vault.target, amount);
    await vault.connect(user1).deposit(amount, futureTime);
  });

  it("should revert if non-owner tries to call withdraw", async () => {
    await expect(
      vault.connect(user1).withdraw(user1.address)
    ).to.be.revertedWith("Only owner can call");
  });

  it("should allow withdraw after lock period ends", async () => {
    // Move time past lockEnd
    await ethers.provider.send("evm_increaseTime", [200]);
    await ethers.provider.send("evm_mine");

    // Fund vault
    const expectedReward = await vault.calculateReward(user1.address);
    const totalNeeded = amount + expectedReward;
    await token.transfer(owner.address, totalNeeded * 2n);
    await token.connect(owner).transfer(vault.target, totalNeeded * 2n);

    await vault.connect(owner).withdraw(user1.address);

    const stake = await vault.stakes(user1.address);
    expect(stake.amount).to.equal(0);
    expect(stake.withdrawn).to.equal(true);
  });

  it("should calculate and transfer correct reward", async () => {
    // Move time past lockEnd
    await ethers.provider.send("evm_increaseTime", [200]);
    await ethers.provider.send("evm_mine");

    // Fund vault
    const expectedReward = await vault.calculateReward(user1.address);
    const totalNeeded = amount + expectedReward;
    await token.transfer(owner.address, totalNeeded * 2n);
    await token.connect(owner).transfer(vault.target, totalNeeded * 2n);

    const userBalanceBefore = await token.balanceOf(user1.address);

    await vault.connect(owner).withdraw(user1.address);

    const userBalanceAfter = await token.balanceOf(user1.address);
    const received = userBalanceAfter - userBalanceBefore;

    // Allow small rounding tolerance
    expect(received).to.be.closeTo(amount + expectedReward, ethers.parseEther("0.01"));
  });

  it("should transfer total amount (stake + reward) to the user", async () => {
    // Move time past lockEnd
    await ethers.provider.send("evm_increaseTime", [200]);
    await ethers.provider.send("evm_mine");

    // Fund vault
    const expectedReward = await vault.calculateReward(user1.address);
    const totalNeeded = amount + expectedReward;
    await token.transfer(owner.address, totalNeeded * 2n);
    await token.connect(owner).transfer(vault.target, totalNeeded * 2n);

    // Withdraw
    await vault.connect(owner).withdraw(user1.address);

    const userBalance = await token.balanceOf(user1.address);

    // Stake + reward should be transferred
    expect(userBalance).to.be.closeTo(amount + expectedReward, ethers.parseEther("0.01"));
  });
});



  });

});
