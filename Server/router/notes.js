const express = require('express');
const router = express.Router();
const Authentication = require('../middleware/authentication');
const Note = require('../models/Note');

router.get("/getNote", Authentication, async (req, res) => {
    try {
        const findNotes = await Note.find({ user: req.userId });
        if (!findNotes) {
            return res.status(400).json("Unable to access Notes !")
        }

        // console.log(findNotes);
        return res.status(200).json(findNotes);
    }
    catch (error) {
        return res.status(400).json("Some error to find notes")
    }
})

// Add Note
router.post("/addNote", Authentication, async (req, res) => {
    // console.log(req.body);
    const { title, subTitle, description } = req.body;
    const userid = req.userId;
    try {
        const createNote = new Note({ title, subTitle, description, user: userid });
        const saveNote = await createNote.save();

        if (!saveNote) {
            return res.status(400).json("An error Occured in saving note !");
        }
        return res.status(200).json("Note added successfully !!")
    }
    catch (error) {
        res.status(400).json({ "Error": error })
    }
})

// Update Note
router.put("/updateNote/:id", Authentication, async (req, res) => {
    const { title, subTitle, description } = req.body;
    try {
        let updateObj = {};
        if (title) updateObj.title = title;
        if (subTitle) updateObj.subTitle = subTitle;
        if (description) updateObj.description = description;
        if (Object.keys(updateObj).length === 0) {
            return res.status(400).json("Please Enter Value to update Note !")
        }

        console.log(req.params.id);
        const findNote = await Note.findById(req.params.id);
        if (!findNote) {
            return res.status(400).json("Note was not found !")
        }

        if (findNote.user.toString() != req.userId.toString()) {
            return res.status(400).json("User Not found !!")
        }

        const updateNote = await Note.findByIdAndUpdate(req.params.id, { $set: updateObj }, { new: true });
        if (!updateNote) {
            return res.status(400).json("Note not updated !")
        }

        return res.status(200).json("Note Updated Successfully !!")
    }
    catch (error) {
        return res.status(400).json("Some error to update Note !")
    }
})

// Delete Note
router.delete("/deleteNote/:id", Authentication, async (req, res) => {
    try {
        const findNote = await Note.findById(req.params.id);
        if (!findNote) {
            return res.status(400).json("Note not found !")
        }

        if (req.userId.toString() !== findNote.user.toString()) {
            return res.status(400).json("Access Denied for this user to delete !")
        }

        const deleteNote = await Note.findByIdAndDelete(req.params.id);
        if (!deleteNote) {
            return res.status(400).json("Note not deleted .. Try again ...");
        }

        return res.status(200).json("Note Deleted Successfully !")
    }
    catch (error) {
        return res.status(400).json("Some Error to delete Note")
    }
})

module.exports = router;    