const mongoose = require("mongoose");

const ScanSchema = new mongoose.Schema({
  output: { type: String, required: true },
  scanDate: { type: Date, default: Date.now }, // Date of the scan
  vulnerabilitiesCount: { type: Number, required: true }, // Number of vulnerabilities
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true }, // Reference to Project
});

module.exports = mongoose.model("Scan", ScanSchema);