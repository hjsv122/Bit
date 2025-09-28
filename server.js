const express = require('express');
const { GelatoRelay } = require("@gelatonetwork/relay-sdk");
const { ethers } = require("ethers");
require('dotenv').config();

const app = express();
app.use(express.json());

const relay = new GelatoRelay();

// إعدادات أساسية من env
const API_KEY = process.env.GELATO_API_KEY;
const SENDER_ADDRESS = process.env.SENDER_ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const USDT_ADDRESS = process.env.USDT_ADDRESS;
const RECEIVER_CHAIN_ID = 1; // Ethereum Mainnet

// ABI بسيط لتحويل USDT (transfer)
const ERC20_ABI = [
  "function transfer(address to, uint amount) public returns (bool)"
];

// شبكة Ethereum الرئيسية
const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth");
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

app.post("/send", async (req, res) => {
  const { to, amount } = req.body;

  try {
    const token = new ethers.Contract(USDT_ADDRESS, ERC20_ABI, signer);
    const amountInWei = ethers.parseUnits(amount, 6); // USDT = 6 decimals

    const tx = await token.transfer(to, amountInWei);
    await tx.wait();

    return res.json({ success: true, message: `تم الإرسال: ${tx.hash}` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server is running on port ${PORT}`));
