const Scan = require("../models/Scan");
const Project = require("../models/Project");

// Create a new scan and associate it with a project
const createScan = async (output, vulnerabilitiesCount, projectId) => {
  // Create the scan
  const scan = new Scan({ output, vulnerabilitiesCount, projectId });
  const savedScan = await scan.save();

  // Associate the scan with the project
  await Project.findByIdAndUpdate(projectId, { $push: { scans: savedScan._id } });

  return savedScan;
};

module.exports = { createScan };