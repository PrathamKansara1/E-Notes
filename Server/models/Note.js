const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    title: {
        type : String,
        required : true
    },
    subTitle : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }
})

const Note = new mongoose.model("notes", NoteSchema);

module.exports = Note;