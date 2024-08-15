import { ethers, parseUnits } from "ethers";
import solc from "solc";

(async () => {
  const infura = new ethers.InfuraProvider("sepolia", process.env.INFURA_KEY);

  var input = {
    language: "Solidity",
    sources: {
      "contract.sol": {
        content: 'contract Juan { string public hi = "smallcoock";}',
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };

  var output = JSON.parse(solc.compile(JSON.stringify(input)));

  const contractBytecode =
    output.contracts["contract.sol"].Juan.evm.bytecode.object;

  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, infura);

  const factory = new ethers.ContractFactory(
    ["constructor(uint tot)"],
    contractBytecode,
    signer
  );

  const contract = await factory.deploy(parseUnits("1"));
  const res = await contract.deploymentTransaction().wait();
  console.log(res.contractAddress);
})();
