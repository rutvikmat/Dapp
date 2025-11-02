import React, { useState } from "react";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import contractABI from "../contractABI.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ipfsClient = create({ url: "http://127.0.0.1:5001" });

function Register() {
  const [account, setAccount] = useState(null);
  const [did, setDid] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const connectWallet = async () => {
    const [acc] = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccount(acc);
  };

  const uploadAndRegister = async () => {
    if (!did || !file) return alert("Enter DID and select a file");
    try {
      setStatus("Uploading to IPFS...");
      const added = await ipfsClient.add(file);
      const cid = added.path;

      setStatus(`CID: ${cid} — Sending transaction...`);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

      const tx = await contract.registerIdentity(did, cid);
      setStatus("Transaction sent. Waiting for confirmation...");
      await tx.wait();

      setStatus(`✅ Registered on chain! Tx: ${tx.hash}`);
    } catch (err) {
      console.error(err);
      setStatus(`❌ ${err.message}`);
    }
  };

  return (
    <div className="container">
      <h2>Register a New Identity</h2>
      <button className="btn btn-dark mb-3" onClick={connectWallet}>
        {account ? `Connected: ${account.substring(0, 8)}...` : "Connect Wallet"}
      </button>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Enter DID (e.g. did:student:001)"
        value={did}
        onChange={(e) => setDid(e.target.value)}
      />
      <input type="file" className="form-control mb-2" onChange={(e) => setFile(e.target.files[0])} />
      <button className="btn btn-primary" onClick={uploadAndRegister}>Upload & Register</button>
      <p className="mt-3">{status}</p>
    </div>
  );
}

export default Register;
