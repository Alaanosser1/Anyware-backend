const mongoose = require("mongoose");

// Define the Announcement Schema
const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Announcement model
const Announcement = mongoose.model("Announcement", announcementSchema);

module.exports = Announcement;
