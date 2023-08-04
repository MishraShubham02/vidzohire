const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");
const { ispremited } = require("../middleware/auth");
const {
  applyJob,
  hrjob,
  getJobApplicants,
  getjobid,
  GetJob,
} = require("../controllers/jobcontroller");

const {
  jobcreater,
  getjob,
  updatejob,
  deletejob,
  jobStats,
} = require("../controllers/jobcontroller");

//ROUTES of JOB
router.post("/create-job", isAuthenticated, ispremited, jobcreater);
//get company name (test)
router.get("/company",GetJob)
//get jobs
router.get("/get-job", isAuthenticated, getjob);
router.get("/get-job/:id", isAuthenticated, getjobid);

//hr job
router.get("/hrjob", isAuthenticated, hrjob);

// update job
router.patch("/update-job/:id", isAuthenticated, updatejob);

//delete job
router.delete("/delete-job/:id", isAuthenticated, deletejob);

//job stats
router.get("/stats-job", isAuthenticated, jobStats);

//apply job
router.post("/apply-job/:id", isAuthenticated, applyJob);
// GET job applicants
router.get("/jobs/applicants/:id", getJobApplicants);

module.exports = router;
