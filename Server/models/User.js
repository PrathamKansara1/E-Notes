const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email : {
        type: String,
        require: true   
    },
    password : {
        type: String,
        require: true   
    },
    confirmpassword : {
        type: String,
        require: true   
    }
})

const User = new mongoose.model("users", UserSchema);
module.exports = User;