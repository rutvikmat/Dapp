import React, { useState } from "react";
import { ethers } from "ethers";
import contractABI from "../contractABI.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function ViewIdentity() {
  const [did, setDid] = useState("");
  const [result, setResult] = useState(null);

  const fetchIdentity = async () => {
    if (!did) return alert("Enter DID");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
    try {
      const res = await contract.getIdentity(did);
      setResult({
        owner: res[0],
        ipfsHash: res[1],
        verified: res[2],
        verifier: res[3],
        timestamp: new Date(res[4].toNumber() * 1000).toString(),
      });
    } catch (err) {
      alert("❌ Identity not found or contract error.");
    }
  };

  return (
    <div className="container">
      <h2>View Registered Identity</h2>
      <input type="text" className="form-control mb-2" placeholder="Enter DID" onChange={(e) => setDid(e.target.value)} />
      <button className="btn btn-primary" onClick={fetchIdentity}>Get Identity</button>

      {result && (
        <div className="alert alert-secondary mt-3">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ViewIdentity;
