const mongoose  = require('mongoose');

//defining schemas

const blogSchema = new mongoose.Schema({
    "title":String,
    "content":String,
    "user_id":[{type:mongoose.Schema.Types.ObjectId , ref:'User'}]
}) 

const userSchema  = new mongoose.Schema({
    "username":String,
    "password":String,
    "intrest":[String],
    "followers":[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
})

//definging models
const blogModel = mongoose.model("Blog",blogSchema);
const userModel = mongoose.model("User",userSchema);

//exporting modles
module.exports = { blogModel , userModel }