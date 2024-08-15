import { ethers } from "ethers";

(async () => {
  const infura = new ethers.InfuraProvider("ethereum", process.env.INFURA_KEY);

  const balance = await infura.getBalance(
    "0xE3c2200996a83095099f2b8f69F39d1bBFa33456"
  );
  console.log(balance);
})();
