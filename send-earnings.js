const { ethers } = require("ethers");
const express = require("express");
const cors = require("cors");

// إعدادات الشبكة
const RPC_URL = "http://localhost:8545"; // غيره حسب مكان تشغيل العقدة
const CHAIN_ID = 2025;

// المفتاح الخاص للحساب الإداري
const ADMIN_PRIVATE_KEY = "ضع_المفتاح_الخاص_هنا_بصيغة_0x";

// إنشاء موفر وموقّع
const provider = new ethers.providers.JsonRpcProvider(RPC_URL, { chainId: CHAIN_ID, name: "BatmanNet" });
const adminWallet = new ethers.Wallet(ADMIN_PRIVATE_KEY, provider);

// إعداد خادم Express
const app = express();
app.use(cors());
app.use(express.json());

// نقطة النهاية لإرسال الأرباح
app.post("/send-earnings", async (req, res) => {
  try {
    const { to, amount } = req.body;

    if (!to || !amount) {
      return res.status(400).json({ error: "الرجاء إدخال عنوان المحفظة والمبلغ" });
    }

    const value = ethers.utils.parseEther(amount.toString());

    // إنشاء المعاملة
    const tx = await adminWallet.sendTransaction({
      to,
      value,
      gasPrice: 0,
      gasLimit: 21000,
    });

    // انتظار تأكيد المعاملة
    await tx.wait();

    res.json({ success: true, txHash: tx.hash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "حدث خطأ في إرسال الأرباح" });
  }
});

// بدء الخادم على بورت 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
