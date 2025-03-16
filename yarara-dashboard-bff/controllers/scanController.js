const { createScan } = require("../services/scanService");

// Create a new scan
const createScanHandler = async (req, res) => {
  const { repoUrl, projectId } = req.body;
  try {
    console.log("LLEGO LA URL")
    console.log(repoUrl);
    const scan = await createScan(projectId);
    res.status(201).json(scan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createScanHandler };