import { ethers } from "hardhat";
async function main() {
  const [signer] = await ethers.getSigners();

  const TOKEN_ADDRESS = "0x5Ce4697E2AE0E1c68Fccb4A692DDC82057C4d0e3";
  const CALLER_ADDRESS = "0x9abDB3677Df68CB44B6B19a49b374329458541cb";

  const receiver = "0xd77dfa9529aea05161390c8e25d443ac3468d2a0";
  const amount = ethers.utils.parseUnits("100", 18);

  const tokenCaller = await ethers.getContractAt(
    "TokenCaller",
    CALLER_ADDRESS,
    signer
  );

  const token = await ethers.getContractAt(
    "MyToken",
    TOKEN_ADDRESS,
    signer
  );

  const before = await tokenCaller.getBalance(
    TOKEN_ADDRESS,
    signer.address
  );
  console.log("Balance before:", before.toString());


  const approveTx = await token.approve(CALLER_ADDRESS, amount);
  await approveTx.wait();
  console.log("Approved:", amount.toString());


  const allowance = await token.allowance(
    signer.address,
    CALLER_ADDRESS
  );
  console.log("Allowance:", allowance.toString());


  const tx = await tokenCaller.transferToken(
    TOKEN_ADDRESS,
    receiver,
    amount
  );
  await tx.wait();
  console.log("Transfer successful");

  const after = await tokenCaller.getBalance(
    TOKEN_ADDRESS,
    signer.address
  );
  console.log("Balance after:", after.toString());
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
