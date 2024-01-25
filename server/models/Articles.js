import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title:{type:String, required:true , unique:true},
    subtext:{type:String},
    image:[{type:String}],
    story:{type:String, required:true, unique:true}, 
    author:{type:mongoose.Schema.Types.ObjectId, ref:'users'},

})

export const ArticleModel = mongoose.model("articles", articleSchema)