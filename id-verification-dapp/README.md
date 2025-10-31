# Decentralized Identity Verification Dapp (Local Demo)

This repository is an academic prototype of a Decentralized Identity Verification system.
It includes:
- A Solidity smart contract (`contracts/DIDRegistry.sol`)
- Hardhat scripts to compile & deploy locally
- IPFS upload script (local IPFS daemon assumed)
- A minimal React frontend (in `frontend/`) to connect MetaMask, upload docs to IPFS, and register DID on-chain
- An optional Express backend (in `backend/`) to act as a verifier

## Quick start (recommended)
1. Install Node.js (v18+) and npm.
2. Install IPFS and run `ipfs init` then `ipfs daemon`.
3. In project root:
   ```bash
   npm install
   npx hardhat node
   ```
4. In another terminal:
   ```bash
   npx hardhat compile
   npx hardhat run --network localhost scripts/deploy.js
   ```
5. Note the deployed contract address and update `frontend/src/App.js` `CONTRACT_ADDRESS` constant.
6. Start the frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```
7. Open MetaMask, import an account from Hardhat node, connect to http://localhost:3000, upload a document and register.

Full run & setup instructions are included in the project report.

