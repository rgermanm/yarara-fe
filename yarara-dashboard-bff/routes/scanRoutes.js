const express = require("express");
const { createScanHandler } = require("../controllers/scanController");

const router = express.Router();

// Create a new scan
router.post("/scans", createScanHandler);

module.exports = router;