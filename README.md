# 🧠 Decentralized Identity Verification DApp

A blockchain-based decentralized application for securely registering and verifying digital identities using **Ethereum Smart Contracts** and **IPFS** (InterPlanetary File System) for tamper-proof document storage.

---

## 📘 Overview
This project demonstrates how blockchain can be used to manage identity information securely and transparently.
Each user registers their identity along with a supporting document stored on IPFS.
The blockchain ensures immutability, while verification can be done by authorized verifiers.

---

## 🏗️ Tech Stack

| Layer | Technology | Description |
|-------|-------------|-------------|
| **Smart Contract** | Solidity (v0.8.19) | Implements DID registry for identity registration & verification |
| **Blockchain Environment** | Hardhat (Local Ethereum) | Deploys and tests smart contracts |
| **Frontend** | React.js (via Create React App) | User-friendly DApp interface for registration & verification |
| **Backend (Verifier API)** | Node.js + Express | Provides endpoint for off-chain verification |
| **Storage** | IPFS (Local Node) | Stores user identity files (PDFs, IDs, etc.) in decentralized storage |
| **Wallet** | MetaMask | Connects user wallet and signs blockchain transactions |
| **Libraries** | Ethers.js v5 | Interacts with smart contracts from React frontend |

---

## ⚙️ Prerequisites

Make sure the following are installed:
- **Node.js** ≥ 18.x
- **npm** ≥ 8.x
- **MetaMask** browser extension
- **IPFS Daemon**
  ```bash
  brew install ipfs       # macOS
  ipfs init
  ```
- **Hardhat** (installed via `npm install`)

---

## 🚀 Installation Steps

### 1️⃣ Clone or Unzip Project
```bash
unzip id-verification-dapp-final.zip
cd id-verification-dapp-final
```

### 2️⃣ Install Root Dependencies
```bash
npm install
```

### 3️⃣ Start Local Blockchain
```bash
npx hardhat node
```
This will start a local Ethereum test network and generate 20 accounts with private keys.

### 4️⃣ Deploy the Smart Contract
Open a new terminal:
```bash
npx hardhat compile
npx hardhat run --network localhost scripts/deploy.js
```
Copy the deployed contract address printed in terminal.

### 5️⃣ Configure Frontend
Edit file:
`frontend/src/App.js`
Replace the line:
```js
const CONTRACT_ADDRESS = "REPLACE_WITH_DEPLOYED_CONTRACT_ADDRESS";
```
with your deployed address.

---

## 🪣 Setting up IPFS

1. Run the local IPFS daemon:
   ```bash
   ipfs daemon
   ```
2. Allow CORS for frontend:
   ```bash
   ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:3000"]'
   ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["GET", "POST", "PUT"]'
   ipfs config --json API.HTTPHeaders.Access-Control-Allow-Headers '["Authorization"]'
   ```

---

## 🖥️ Start the Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at 👉 **http://localhost:3000**

---

## 🔑 MetaMask Setup

1. Open MetaMask → Add Network →
   - **Network Name:** Hardhat Localhost
   - **RPC URL:** http://127.0.0.1:8545
   - **Chain ID:** 31337
2. Import any private key from Hardhat node console output.

---

## 🔍 Using the App

1. Connect MetaMask.
2. Enter a unique DID (e.g., `did:student:001`).
3. Upload a document (PDF/image).
4. Click **“Upload & Register”** → approve transaction in MetaMask.
5. Use **“Get Identity”** to view registered details.

---

## ⚡ Backend (Verifier API)

1. Navigate to `backend/` folder
2. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill values for:
   - `CONTRACT_ADDRESS`
   - `RPC_URL=http://localhost:8545`
   - `VERIFIER_PRIVATE_KEY=<PrivateKeyFromHardhatNode>`
3. Start backend:
   ```bash
   npm install
   npm start
   ```
   Backend will run on **http://localhost:5001**

---

## 🧩 Smart Contract Details

- **Contract Name:** `DIDRegistry`
- **Functions:**
  - `registerIdentity(string did, string ipfsHash)`
  - `verifyIdentity(string did)`
  - `getIdentity(string did)`

---

## 🧠 Concept

- **Decentralization:** No central authority manages identity data.
- **Security:** Identities are tied to wallet addresses and verified via smart contracts.
- **Transparency:** Anyone can view verification status on the blockchain.
- **Immutability:** Once registered, identity data cannot be tampered with.

---

## 📜 Sample Output

After successful deployment & registration:
```
DIDRegistry deployed to: 0xAbCd...1234
CID: QmTxyzabc123...
Transaction sent...
Registered on chain! Tx: 0x456efabc...
```

---

## 🧾 Author
**Rutvik Mathapati**  
MCA Final Year Project — Decentralized Identity Verification System
