"use server"
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
id:{type:String,required:true},

name: {

   type: String,
   required: true,

},

username: {
   type: String,
   required: true,
   unique: true,

},

image: String,

bio: String,

onboarded: {
type: Boolean,
default: false,
},

threads: [Schema.Types.Mixed]

})

export const User =  mongoose.models.User || mongoose.model("User", userSchema)  

