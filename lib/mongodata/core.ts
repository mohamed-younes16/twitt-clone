"use server"
import { User } from "@/schemas/user"
import { connectToDB } from "../actions"
import Threads from "@/schemas/threads"
import { currentUser } from "@clerk/nextjs"

export  const updateUser= async (data:{
        id:string,
        imageUrl:string,
        username: string ,
        bio : string,
        name : string
}) => {

    await  connectToDB()
try {
const res =  await User.findOneAndUpdate(
    {id:data.id,
    
},{image:data.imageUrl,
    bio:data.bio
    ,name:data.name
    ,username:data.username,
    onboarded:true
},{upsert:true})

if (res){ 

    return "done#"
}


 
} catch (error:any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
}




}


export  const findUser= async (id : string) => {

    await  connectToDB()
try {

const res =  await User.findOne( {id})

if (res){ 

    return res
}


 
} catch (error:any) {
    
    throw new Error(`Failed to create/update user: ${error.message}`);

}




}

export  const findUsersbyList= async (list : any[]) => {

    await  connectToDB()
try {

const res =  await User.find({_id:{$in:list}})

if (res){ 

    return res
}


 
} catch (error:any) {
    
    throw new Error(`Failed to create/update user: ${error.message}`);

}




}





export const createThreadtodb = async ({content,isReply=false}:{content:string,isReply:boolean})=>{

    try {
        connectToDB()
        const current = await currentUser()
        const userfromdb = await User.findOne({id: current?.id })
        const created = await Threads.create({author:userfromdb._id,content,isReply})
        console.log(created)
        return created
    

    } catch (error) {
    console.log(error)  
    return false  
    }
}




export const replyToThread = async ({content,id}:{content:string,id:string})=>{
    try {

        connectToDB()
        
        const createdthread = await createThreadtodb({content:content,isReply:true})
    
        await Threads.findByIdAndUpdate(id,{$push:{children:createdthread._id}})
    
        return true
    

    } catch (error) {
    console.log(error)  
    return false  
    }
}


export const getallThreadfromdb = async ({limit=10, page }:{limit?:number,page?:number})=>{

    try {
connectToDB()

        const allthreads: any[] = await Threads.find({isReply:false}).limit(limit).sort({createdAt:-1})
   
        return allthreads

    } catch (error) {
    console.log(error)   
  
    }
}


export const getSpecificThread= async (id:string)=>{

    try {
   
        connectToDB()
        const thread = await Threads.findById(id)
   
        return thread

    } catch (error) {
    console.log(error)   
    return false
    }
}

export const getThreads= async (list:string)=>{

    try {
      
        connectToDB()
        const threads = await Threads.find({_id:{$in:list}})

        return threads

    } catch (error) {
    console.log(error)   
    
    }
}

export const getThreadsbyType= async (author:string,isReply=false)=>{

    try {
        connectToDB()
        const threads = await Threads.find({author,isReply})

        return threads

    } catch (error) {
    console.log(error)   
    
    }
}

export const searchUsersByName = async (searchTerm:string,username:string) => {
    try {
      const regex = new RegExp(searchTerm, 'i'); 
      const results = await User.find({$or :[{ username: {$regex: regex ,$ne:username}}, { name: {$regex: regex ,$ne:username}} ] });
      return results;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };




export const getUsetAcivity = async (author:string) => {

    try {

        const filteredThreads = await Threads.find({author})

        const filtered = filteredThreads.map(e=>e.children).flat(Infinity)
        
        const replies =  await Threads.find({_id:{ $in :filtered },author:{$ne:author}}).populate({

            path:"author",model:User,

        select:" name image _id id"}).sort({createdAt : -1}).limit(10)
    
        return replies
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


