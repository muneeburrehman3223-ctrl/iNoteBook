const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes" — Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error("Fetch notes error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ROUTE 2: Add a new note using: POST "/api/notes/addnote" — Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error("Add note error:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// ROUTE 3: Update an existing note using: PUT "/api/notes/updatenote/:id" — Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // Create a new note object
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // Find the note to be updated
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Allow update only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not Allowed" });
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json({ success: true, note });
  } catch (error) {
    console.error("Update note error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ROUTE 4: Delete an existing note using: DELETE "/api/notes/deletenote/:id" — Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    console.log("Delete route hit for ID:", req.params.id);

    // Find the note to be deleted
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not Allowed" });
    }

    // Delete the note
    await Note.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Note has been deleted", note });
  } catch (error) {
    console.error("Delete note error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
