const express = require("express");
const router = express.Router();
const { addSource } = require("../controllers/sourceController");
const auth = require("../middleware/VerifyToken");

router.post("/add-source", auth, addSource);

module.exports = router;
