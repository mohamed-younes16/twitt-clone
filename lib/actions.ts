import mongoose from "mongoose";

export const connectToDB = async ( )=>{
    const dburl:string   = process.env.MONGODB_URL || ""
try {
    await mongoose.connect(dburl)

} catch (error) {
    console.log(error);
}

}