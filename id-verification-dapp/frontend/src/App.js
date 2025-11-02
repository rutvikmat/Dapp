import React, { useState } from "react";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";

// TODO: replace with your deployed contract address after running deploy script
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ABI = [
  "function registerIdentity(string did, string ipfsHash) external",
  "function getIdentity(string did) external view returns (address owner, string ipfsHash, bool verified, address verifier, uint256 timestamp)"
];


const ipfsClient = create({ url: "http://127.0.0.1:5001" });


function App() {
  const [account, setAccount] = useState(null);
  const [did, setDid] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  async function connectWallet() {
    if (!window.ethereum) return alert("Install MetaMask");
    const [acc] = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccount(acc);
  }

  async function uploadAndRegister() {
    if (!did || !file) return alert("Provide DID and file");
    setStatus("Uploading to IPFS...");
    const added = await ipfsClient.add(file);
    const cid = added.path;
    setStatus("CID: " + cid + " — Sending transaction...");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    try {
  const tx = await contract.registerIdentity(did, cid);
  setStatus("Transaction sent. Waiting for confirmation...");
  await tx.wait();
  setStatus("Registered on chain! Tx: " + tx.hash);
} catch (err) {
  console.error("Blockchain call failed:", err);
  setStatus("❌ " + (err.reason || err.message || JSON.stringify(err)));
}
  
  }

  async function fetchIdentity() {
    if (!did) return alert("enter DID");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    const res = await contract.getIdentity(did);
    alert(JSON.stringify({
      owner: res[0],
      ipfsHash: res[1],
      verified: res[2],
      verifier: res[3],
      timestamp: new Date(res[4].toNumber() * 1000).toString()
    }, null, 2));
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Identity DApp (Prototype)</h1>
      <button onClick={connectWallet}>{account ? account.substring(0,8) + "..." : "Connect MetaMask"}</button>

      <div style={{ marginTop: 20 }}>
        <input placeholder="DID (e.g., did:student:1234)" value={did} onChange={e=>setDid(e.target.value)} />
        <input type="file" onChange={e=>setFile(e.target.files[0])} />
        <button onClick={uploadAndRegister}>Upload & Register</button>
        <button onClick={fetchIdentity}>Get Identity</button>
      </div>

      <div style={{ marginTop: 10 }}>{status}</div>
    </div>
  );
}

export default App;
