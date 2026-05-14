import { expect } from "chai";
import { ethers } from "hardhat";

describe("MyToken Contract", function () {

  async function deployFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();
console.log(owner.address);
    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy();
    await token.waitForDeployment();

    return { token, owner, addr1, addr2 };
  }

  //  Initial Balance Test
  it("Should assign initial supply to owner", async function () {
    const { token, owner } = await deployFixture();

    const balance = await token.balanceOf(owner.address);

    expect(balance).to.equal(ethers.parseEther("1000"));
  });

  //  Mint Test
  it("Should mint tokens correctly", async function () {
    const { token, addr1 } = await deployFixture();

    await token.mint(addr1.address, ethers.parseEther("100"));

    const balance = await token.balanceOf(addr1.address);

    expect(balance).to.equal(ethers.parseEther("100"));
  });

  //  balanceOf Test
  it("Should return correct balance after mint", async function () {
    const { token, owner } = await deployFixture();

    await token.mint(owner.address, ethers.parseEther("50"));

    const balance = await token.balanceOf(owner.address);

    // 1000 initial + 50 minted
    expect(balance).to.equal(ethers.parseEther("1050"));
  });
 
  //  Transfer Test
  it("Should transfer tokens between accounts", async function () {
    const { token, owner, addr1 } = await deployFixture();

    await token.transfer(addr1.address, ethers.parseEther("200"));

    const ownerBalance = await token.balanceOf(owner.address);
    const addr1Balance = await token.balanceOf(addr1.address);

    expect(ownerBalance).to.equal(ethers.parseEther("800")); // 1000 - 200
    expect(addr1Balance).to.equal(ethers.parseEther("200"));
  });

  //  Transfer Fail Test
  it("Should fail if sender has insufficient balance", async function () {
    const { token, addr1 } = await deployFixture();

    await expect(
      token.connect(addr1).transfer(addr1.address, ethers.parseEther("10"))
    ).to.be.reverted;
  });

});
