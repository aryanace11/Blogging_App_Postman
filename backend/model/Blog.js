import e from "express";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const blogSchema = new Schema({
title : {
type: String,
required: true
},
description: {

type: String, 

required: true  
},
image: {
type: String,
required: true
},  
name: {
type: String,
required: true },
blogs: [
{type: mongoose.Types.ObjectId,ref: "Blog",required: true}],
});
export default mongoose.model("Blog", blogSchema);