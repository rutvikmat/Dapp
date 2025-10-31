require('dotenv').config();
const express = require('express');
const { ethers } = require('ethers');
const ABI = [ "function verifyIdentity(string did) external" ];
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL || "http://localhost:8545");
const signer = new ethers.Wallet(process.env.VERIFIER_PRIVATE_KEY || "", provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
const app = express();
app.use(express.json());

app.post('/verify', async (req, res) => {
  const { did } = req.body;
  if (!did) return res.status(400).send("missing did");
  try {
    const tx = await contract.verifyIdentity(did);
    await tx.wait();
    res.json({ success: true, tx: tx.hash });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(5001, ()=> console.log("Backend running 5001"));
