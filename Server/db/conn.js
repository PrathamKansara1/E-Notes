const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, (error)=>{
    if(error){
        console.log("Some Error Occured to connect database" + error);
    }
    else{
        console.log("Database connected successfully")
    }
})