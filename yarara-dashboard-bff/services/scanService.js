const { exec } = require("child_process");
const Scan = require("../models/Scan");
const Project = require("../models/Project");
const path = require("path");
const fs = require("fs");

// Create a new scan and associate it with a project


const findScanById = async (scanId) => {
  return await Scan.findById(scanId);
};

const createScan = async (projectId, repoUrl) => {
  // Create the scan
  const scan = new Scan({ projectId });
  const savedScan = await scan.save();
  console.log("URL DEL PROYECTO")
  console.log(repoUrl)
  // Define the directory where the repository will be cloned
  const cloneDir = path.join(__dirname, "..", "repos", savedScan._id.toString());

  // Create the directory if it doesn't exist
  if (!fs.existsSync(cloneDir)) {
    fs.mkdirSync(cloneDir, { recursive: true });
  }

  // Clone the repository
  const cloneCommand = `git clone ${repoUrl} ${cloneDir}`;

  const databasePath = `databases/`
  //const codeQLDBExtractCommand = `codeql database create --overwrite --search-path codeql/clarity/extractor-pack -l clarity ./${databasePath} -s ${cloneDir}`;
  //const codeQLRun = `codeql query run ./clarity/ql/lib/codeql/detectors.ql -d ./${databasePath} -o CodeQLScanOut.bqrs`

  exec(cloneCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error cloning repository: ${error.message}`);
      return;
    }

    // Git often writes progress information to stderr, so we log it as well
    if (stderr) {
      console.log(`Git stderr: ${stderr}`);
    }

    if (stdout) {
      console.log(`Git stdout: ${stdout}`);
    }

    console.log("Repository cloned successfully.");
  }
  )

  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    { $push: { scans: savedScan._id } }, // Add the scan ID to the project's scans array
    { new: true } // Return the updated project
  ).populate("scans"); // Optionally populate the scans field with scan data

  return updatedProject;
};

module.exports = { createScan, findScanById };