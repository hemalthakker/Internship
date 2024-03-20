const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

//optional

router.post("/orders", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: "rzp_test_4ULCYML9OnP2B6",
      key_secret: "O6gOUg4bw0wol8xMKkSTCphb",
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", "O6gOUg4bw0wol8xMKkSTCphb")
      .update(sign.toString())
      .digest("hex");
    if (razorpay_signature === expectedSign) {
      res.status(200).json({ message: "Payment Verified Sucessfully!" });
    } else {
      res.status(500).json({ message: "Payment verification Failed!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
});

module.exports = router;
