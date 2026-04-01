const { ethers } = require("ethers");

const RPC = "https://rpc.testnet.minepi.com";

const methods = [
  "eth_chainId",
  "eth_blockNumber",
  "eth_gasPrice",
  "eth_accounts",
  "eth_getBalance",
  "net_version",
  "web3_clientVersion"
];

async function scanRPC() {
  const provider = new ethers.JsonRpcProvider(RPC);

  console.log("=== 🚀 PI RPC SCAN RESULT ===\n");

  // Test basic
  try {
    const block = await provider.getBlockNumber();
    console.log("✅ Block Number:", block);
  } catch (e) {
    console.log("❌ getBlockNumber failed");
  }

  console.log("\n=== 🔍 METHOD SCAN ===\n");

  for (let method of methods) {
    try {
      const result = await provider.send(method, []);
      console.log(`✅ ${method}:`, result);
    } catch (err) {
      console.log(`❌ ${method}: not supported`);
    }
  }

  console.log("\n=== 🧠 FINAL CHECK ===");

  try {
    const chainId = await provider.send("eth_chainId", []);
    if (chainId) {
      console.log("🔥 EVM DETECTED!");
    }
  } catch {
    console.log("⚠️ Not EVM (or not enabled yet)");
  }
}

scanRPC();
