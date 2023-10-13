import { ThreadCardTabs } from '@/constants.index';
import { formatDateString } from '@/lib/utils';
import { User } from '@/schemas/user'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import Infinite from './Infinit';
import { findUsersbyList, getSpecificThread, getThreads } from '@/lib/mongodata/core';

interface UserData  {
    _id: string;
    id: string;
    __v: number;
    bio: string;
    image: string;
    name: string;
    onboarded: boolean;
    threads: any[]; 
    username: string;
};


interface Datatype {
    _id: string;
    author: string;
    content: string;
    children: Datatype[];
    createdAt: string;
    __v: number;
    imageUrl:string;
}


const ThreadCard =async  ({data,comment,last=false}:
    {data:Datatype,reply?:boolean,comment?:boolean,replies?:any,last?:boolean}) => {

        const targetThread = await getSpecificThread(data._id )
        const otherReplies : any[] = await getThreads(targetThread.children) || []
        const repliesAuthors = await findUsersbyList(otherReplies.map(e=>e.author)|| [])
        
        const replyImages = {
            images:Array.from(new Set(repliesAuthors?.map(e => e.image)))
            ,repliesLength:otherReplies.length
        };
        
    const threadOwner:UserData  = await User.findById(data?.author).exec()  
  

return (
<div className=' bg-dark-1 shadow-black md:hover:scale-[102%]   duration-500 transition-all hover:shadow-[0px_0px_15px_0px_#373737]  max-md:p-4  p-6 rounded-2xl m-2 '>
    <div className="flex max-sm:gap-2 gap-10">

   
    <div className=" relative">
            <Link  href={`/profile/${threadOwner?.id}`} 
                    className=' hover:rotate-[360deg] z-20 flex transition-all
                        duration-300 relative rounded-full w-[55px] max-md:h-[35px] max-md:w-[35px]
                    h-[55px] overflow-hidden
                                border-white border-2  '>  
                                    <Image src={threadOwner.image } className='bg-black object-cover' fill alt=''/>
                        
            </Link>
            <div className="absolute w-[1px] h-full bg-white top-0 left-1/2 z-0 -translate-x-1/2  "/>
    
    </div>

    <div className=' mb-5 w-full'>
            <p className="font-bold mb-2 text-xl max-sm:text-lg  whitespace-nowrap">{threadOwner.username} </p>

            <p className="text-gray-400">{data.content} </p>
            {data?.imageUrl &&  <div className="h-80 rounded-lg overflow-hidden max-[520px]:h-36
            max-lg:h-64  max-sm:w-full max-md:w-[450px] max-w-[550px]  my-2 w-full relative " >
                <Image src={data?.imageUrl} fill className=' object-cover' alt='idk'/>
            </div> }
           
       
            <div className="flex gap-4 mt-6 justify-start  "> 

            {ThreadCardTabs.map((e)=>(

                e.link ?(
                    <Link key={e.alt} href={`/thread/${data._id}` } 

                    className="min-w-[30px]  min-h-[30px] relative ">
    
                        <Image src={e.icon}  alt={e.alt} fill />
    
                    </Link>

                ):(
                    <div  key={e.alt}

                    className="min-w-[30px]  min-h-[30px] relative ">
    
                        <Image src={e.icon}  alt={e.alt} fill />
    
                    </div>
                )

            ))}
            </div>
            
    </div> 
    </div>
  {  replyImages?.images?.length > 0 && 
  
         <div className=' flex items-center justify-start mt-3  gap-4'>
                
            <div   className=' w-[50px]  h-[40px] relative'>
            {replyImages?.images?.slice(0,3).map((e:any,i:number)=>(

                <div  style={{translate:`${i * 10}px 0px `}} key={e} className=' absolute top-0 left-0 
                rounded-full w-[35px]  min-h-[35px]
                overflow-hidden
                '>  
                    <Image src={e }  fill alt=''/>
                
                </div>
            
            ))} 
            </div>
            {replyImages?.repliesLength > 0 && 
            <p>
                Comments {replyImages?.repliesLength}
            </p>}
        


      </div>
  
  }

       <div className="text-gray-400 mt-4">{ formatDateString(data.createdAt) } </div>
       {last && <Infinite/>}
</div>
)
}

export default ThreadCard