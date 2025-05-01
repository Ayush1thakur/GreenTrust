const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/VerifyToken');
const {
  getAllSources,
  sellSource,
  buySource,
} = require('../controllers/marketplaceController');

router.get("/all-sources", getAllSources);
router.post("/sell", verifyToken, sellSource);
router.post("/buy", verifyToken, buySource);
router.get("/test", (req, res) => {
    res.send("Marketplace API is working!");
  });
  
module.exports = router;
