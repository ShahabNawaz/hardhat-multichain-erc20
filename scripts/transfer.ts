// import { ethers } from "hardhat";

// async function main() {
//   const [owner, user1] = await ethers.getSigners();

//   const token = await ethers.getContractAt(
//     "MyToken",
//     "0x5FbDB2315678afecb367f032d93F642f64180aa3"
//   );

//   const caller = await ethers.getContractAt(
//     "TokenCaller",
//     "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
//   );

//   console.log("Owner balance before:", ethers.utils.formatEther(await token.balanceOf(owner.address)));
//   console.log("User1 balance before:", ethers.utils.formatEther(await token.balanceOf(user1.address)));

//   // Transfer tokens to TokenCaller first
//   await token.transfer(caller.address, ethers.utils.parseEther("100"));
//   console.log("Transferred 100 tokens from owner to TokenCaller");

//   // Use TokenCaller to send 50 tokens to user1
//   const callerAsOwner = caller.connect(owner);
//   await callerAsOwner.transferToken(token.address, user1.address, ethers.utils.parseEther("50"));
//   console.log("TokenCaller sent 50 tokens to User1");

//   console.log("Owner balance after:", ethers.utils.formatEther(await token.balanceOf(owner.address)));
//   console.log("User1 balance after:", ethers.utils.formatEther(await token.balanceOf(user1.address)));
// }

// main().catch((error) => {
//   console.error(error);
//   process.exit(1);
// });


// import { ethers } from "hardhat";

// async function main() {

//   const [owner, user1, user2, user3] = await ethers.getSigners();


//   const token = await ethers.getContractAt("MyToken", "0x5FbDB2315678afecb367f032d93F642f64180aa3");
//   const caller = await ethers.getContractAt("TokenCaller", "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");

//   console.log("Owner balance before:", ethers.utils.formatEther(await token.balanceOf(owner.address)));
//   console.log("User1 balance before:", ethers.utils.formatEther(await token.balanceOf(user1.address)));
//   console.log("User2 balance before:", ethers.utils.formatEther(await token.balanceOf(user2.address)));
//   console.log("User3 balance before:", ethers.utils.formatEther(await token.balanceOf(user3.address)));

 
//   await token.transfer(caller.address, ethers.utils.parseEther("200"));
//   console.log("Owner transferred 200 tokens to TokenCaller");

//   const callerAsOwner = caller.connect(owner);

//   await callerAsOwner.transferToken(token.address, user1.address, ethers.utils.parseEther("50"));
//   await callerAsOwner.transferToken(token.address, user2.address, ethers.utils.parseEther("70"));
//   await callerAsOwner.transferToken(token.address, user3.address, ethers.utils.parseEther("30"));

//   console.log("TokenCaller distributed tokens to users");

//   console.log("Owner balance after:", ethers.utils.formatEther(await token.balanceOf(owner.address)));
//   console.log("User1 balance after:", ethers.utils.formatEther(await token.balanceOf(user1.address)));
//   console.log("User2 balance after:", ethers.utils.formatEther(await token.balanceOf(user2.address)));
//   console.log("User3 balance after:", ethers.utils.formatEther(await token.balanceOf(user3.address)));
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });


import { ethers } from "hardhat";
async function main() {
  const [signer] = await ethers.getSigners();

  const TOKEN_ADDRESS = "0x96d29cb8b012b05E65314d1051DD9a9edDB690F6";
  const CALLER_ADDRESS = "0xc0c2B9e19E9A1F42467987B02B8972eDa80601c3";

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
