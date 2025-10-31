const fs = require('fs');
const { create } = require('ipfs-http-client');

async function upload(filePath) {
  // for local daemon: use 'http://localhost:5001'
  const client = create({ url: 'http://localhost:5001' });
  const data = fs.readFileSync(filePath);
  const result = await client.add(data);
  console.log('CID:', result.path);
}

const path = process.argv[2];
if (!path) {
  console.log("Usage: node scripts/uploadToIPFS.js <file>");
  process.exit(1);
}
upload(path).catch(err => { console.error(err); process.exit(1); });
