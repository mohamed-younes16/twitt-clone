import mongoose from "mongoose";

export const connectToDB = async ( )=>{
    const dburl:string   = process.env.MONGODB_URL || ""
try {
    await mongoose.connect(dburl)
    console.log("connected_To_DB____ ^_^")


} catch (error) {
    console.log(error);
}

}