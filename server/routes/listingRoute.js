const express = require("express");
const { createListing } = require("../controllers/listingController");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/create", verifyToken, createListing);

module.exports = router;
