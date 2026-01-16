// import { ethers } from "hardhat";

// async function main() {
//   const [signer] = await ethers.getSigners();

// //   const TOKEN = "0x96d29cb8b012b05E65314d1051DD9a9edDB690F6";
// //   const CALLER = "0xc0c2B9e19E9A1F42467987B02B8972eDa80601c3";
// const TOKEN = "0x5Ce4697E2AE0E1c68Fccb4A692DDC82057C4d0e3";
//   const CALLER = "0x9abDB3677Df68CB44B6B19a49b374329458541cb";

//   const caller = await ethers.getContractAt("TokenCaller", CALLER);

//   const balance = await caller.getBalance(TOKEN, signer.address);

//   console.log("Balance (raw):", balance.toString());
//   console.log("Balance (MTK):", ethers.utils.formatUnits(balance, 18));
// }

// main().catch(console.error);

import { ethers } from "hardhat";

async function main() {
  const [signer] = await ethers.getSigners();
  const address = await signer.getAddress();

  const balance = await signer.getBalance();
  const formatted = ethers.utils.formatEther(balance);

  console.log("Address:", address);
  console.log("Network:", (await signer.provider.getNetwork()).name);
  console.log("Chain ID:", (await signer.provider.getNetwork()).chainId);
  console.log("Balance:", formatted, "ETH");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
