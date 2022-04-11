require('dotenv').config();
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const userModel = require("./models/User")
const jwt = require('jsonwebtoken')
const port = process.env.PORT || 5000;
const cors = require('cors')
const Authentication = require('./middleware/authentication');
const Note = require('./models/Note');
require('./db/conn')

app.use(cors())
app.use(express.json());


//Signup
app.post("/signup", async (req, res) => {
    try {
        const finduser = await userModel.findOne({ email: req.body.email });
        if (!finduser) {
            if (req.body.password === req.body.confirmpassword) {
                // console.log(req.body.confirmpassword);

                const pass = await bcrypt.hash(req.body.password, 10);
                const cpass = await bcrypt.hash(req.body.confirmpassword, 10);

                // console.log(cpass);

                const CreateUser = new userModel({
                    email: req.body.email,
                    password: pass,
                    confirmpassword: cpass
                });
                const saveUser = await CreateUser.save();
                if (!saveUser) {
                    return res.status(400).json("Signup Failed !!")
                }

                const data = {
                    user: {
                        id: saveUser.id
                    }
                };

                const jwtToken = jwt.sign(data, process.env.WEBTOKEN)
                console.log(jwtToken);
                return res.status(200).send({ a: "User Added", jwtToken });
            }
            else {
                return res.status(400).send("Password didnt matched")
            }
        }
        else {
            return res.status(400).send("User exists !!")
        }
    }
    catch {
        return res.status(400).send("Signup failed")
    }
})

//Login
app.post("/login", async (req, res) => {
    // console.log(req.body);
    try {
        const finduser = await userModel.findOne({ email: req.body.email });
        if (finduser) {
            const ismatch = await bcrypt.compare(req.body.password, finduser.password);

            if (ismatch) {
                const data = {
                    user: {
                        id: finduser._id
                    }
                }
                const jwtToken = jwt.sign(data, process.env.WEBTOKEN)
                return res.status(200).json({ success: "Login Successful", jwtToken })
            }
            else {
                return res.status(400).send("Incorrect Password !!")
            }
        }
        else {
            return res.status(400).send("User Not Found")
        }
    }
    catch {
        return res.status(400).send("Some error occured during login")
    }
})

// eyJhbGciOiJIUzI1NiJ9.NjIwYmZjM2Y0OGFiOGIzMmViZjZjZTcz.GNDRt9r-8KRXi-Xj-yhUsvKj552zTBJh3PrYFA9JYwU


//getUser
app.get("/getuser", Authentication, async (req, res) => {
    try {
        const userFindId = await userModel.findById(req.userId);
        if (userFindId) {
            res.status(200).send(userFindId)
        }
        else {
            res.status(400).send("User not found")
        }
    }
    catch {
        res.status(400).send("Cannot get userdata")
    }
})


// Add Note
app.post("/addNote", Authentication, async (req, res) => {
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
app.put("/updateNote/:id", Authentication, async (req, res) => {
    const { title, subTitle, description } = req.body;
    try {
        let updateObj = {};
        if (title) updateObj.title = title;
        if (subTitle) updateObj.subTitle = subTitle;
        if (description) updateObj.description = description;
        if (Object.keys(updateObj).length === 0) {
            return res.status(400).json("Please Enter Value to update Note !")
        }

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
app.delete("/deleteNote/:id", Authentication, async (req, res) => {
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

// Get Notes
app.get("/getNote", Authentication, async (req, res) => {
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

app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}`);
})