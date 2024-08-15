import { ethers } from "ethers";

(async () => {
  const infura = new ethers.InfuraProvider("homestead", process.env.INFURA_KEY);

  // Create a contract instance
  const contract = new ethers.Contract(
    "0xbd3531da5cf5857e7cfaa92426877b022e612cf8",
    ["function tokenURI(uint256 tokenId) view returns (string)"],
    infura
  );

  const uri = await contract.tokenURI(3233);
  const data = await fetch(
    `https://ipfs.io/ipfs/${uri.replace("ipfs://", "")}`
  );
  console.log(
    (await data.json()).attributes.find((a) => a.trait_type === "Head")?.value
  );
})();
