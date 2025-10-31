async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const DIDRegistry = await ethers.getContractFactory("DIDRegistry");
  const registry = await DIDRegistry.deploy();
  await registry.deployed();

  console.log("DIDRegistry deployed to:", registry.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
