const Scan = require("../models/Scan");
const Project = require("../models/Project");

// Create a new scan and associate it with a project
const createScan = async (projectId,repoUrl) => {
  // Create the scan
  const scan = new Scan({projectId });
  const savedScan = await scan.save();
  console.log(repoUrl)
  console.log(savedScan._id)
  //ACA YA TENGO EL ID DEL SCAN Y LA URL DEL REPO -> DEBERIA LLAMAR A CODE QL
  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    { $push: { scans: savedScan._id } }, // Add the scan ID to the project's scans array
    { new: true } // Return the updated project
  ).populate("scans"); // Optionally populate the scans field with scan data

  return updatedProject;
};

module.exports = { createScan };