import mongoose from "mongoose"

 const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    userName: {type: String, required:true, unique:true}, 
    password: {type:String, required:true},    
    // savedArticles:[{type:mongoose.Schema.Types.ObjectId,ref:"articles"}]

})

export const UserModel = mongoose.model("users",userSchema)