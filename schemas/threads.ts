import mongoose from "mongoose";

const Threadsschema = new mongoose.Schema({

    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },

    content:{
        type:String, 
        required:true
    },

    createdAt:{
        type:Date, 
        default:Date.now,
    },

    parentId:String,

    children : [
        {

        type:mongoose.Schema.Types.ObjectId,
        ref:"Threads"

    }


    ],
    isReply:{
        type:Boolean,
        default:false
    }

})


const Threads = mongoose.models.Threads || mongoose.model("Threads",Threadsschema)

export default Threads