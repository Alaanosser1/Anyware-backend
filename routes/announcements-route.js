const express = require("express");
const router = express.Router();
const Announcement = require("../models/announcements-model");

// Create a new announcement
router.post("/create", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newAnnouncement = new Announcement({ title, content });
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (error) {
    res.status(500).json({ error: "Announcement creation failed." });
  }
});

// Delete an announcement by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const announcementId = req.params.id;
    const deletedAnnouncement = await Announcement.findByIdAndRemove(
      announcementId
    );
    if (deletedAnnouncement) {
      res.json({ message: "Announcement deleted successfully" });
    } else {
      res.status(404).json({ error: "Announcement not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Announcement deletion failed." });
  }
});

// List all announcements
router.get("/list", async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve announcements." });
  }
});

module.exports = router;
