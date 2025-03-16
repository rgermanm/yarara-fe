const { createScan } = require("../services/scanService");

// Create a new scan
const createScanHandler = async (req, res) => {
  const { repoUrl, projectId } = req.body;
  try {
 
    const scan = await createScan(projectId,repoUrl);
    res.status(201).json(scan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createScanHandler };