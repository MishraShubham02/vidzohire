const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const JobHistorySchema = new mongoose.Schema({
  company: {
    type: String,
  },
  position: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This refers to the name of the User model
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job', // This refers to the name of the Job model
  },
  interviewDate: { type: String },
  applicationStatus: { type: String },
  enum: ["pending", "accepted", "rejected"],

});

const candidateSchema = new mongoose.Schema({
  cdi: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  dob: { type: String },
  state: { type: String },
  about_me: { type: String },
  title: { type: String },
  gender: { type: String },
  location: { type: String },
  pimage: { type: String },
  rdoc: { type: String },
  skills: { type: String },
  salary: { type: Number },
  education: { type: String },
  Experience: { type: String },
  JobHistory: [JobHistorySchema],
  Courses: { type: String },
  otherEducation: { type: String }
});
module.exports = mongoose.model("candidate", candidateSchema);
