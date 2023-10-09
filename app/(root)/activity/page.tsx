import { findUser, getUsetAcivity } from '@/lib/mongodata/core'
import { formatDateString } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs'
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation'
import React from 'react'

type Comment = {
    _id: string; // Assuming _id is a string, but it can be ObjectId type as well
    author: {
      _id: string; // Assuming _id is a string
      image: string;
      name: string;
      id: string; // As
    };
    content: string;
    children: Comment[];
    isReply: boolean;
    createdAt: Date;
    __v: number;
  };
  

const page =async () => {
  function formatTimeElapsed(dateString:string) {
    const date = new Date(dateString);
    const now = new Date();
    const timeDifferenceInMilliseconds = now.getTime() - date.getTime();
  
    const seconds = Math.floor(timeDifferenceInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }
  }

    const user = await currentUser() || {id:""}
  
    const userdb  = await findUser(user.id)
  
    if(!userdb?.onboarded) redirect("/onboarding")

   const repliesData  = await  getUsetAcivity(userdb._id)

   
  return (
    <div className='  bg-opacity-50 backdrop-blur-sm bg-dark-1 rounded-2xl max-md:px-6 p-6 px-28 mx-auto'>
        <p className="text-heading2-bold "> Activity </p>
<div className=''>
    
        {repliesData.map(e=>(
            <div key={e._id} className="pb-4 border-b border-gray-400 mt-6 ">
                  <div key={e._id} className="flex items-center bg-dark-2  rounded-lg gap-4 py-2 px-6 mb-4">

                                <div className="relative cursor-pointer overflow-hidden min-w-[50px] h-[50px] rounded-full ">
                                    <Image src={e.author.image} fill className="object-cover" alt='your image ' /> 
                                    <Link href={`/profile/${e.author.id}`}
                                    className="absolute h-full w-full opacity-0 transition-all
                                    hover:opacity-100 bg-secondary-500  flexcenter ">
                                            <Image src="/person.svg" alt='pencil' height={40}  width={40}  />
                                    </Link>

                                </div>
                                <Link href={`/thread/${e._id}`} className="h-full  items-center gap-6 w-full transition-all
                                    flex  text-lg ">
                                        <span className=" font-bold text-violet-500  whitespace-nowrap'"> {e.author.name}  </span> 
                                        Replied To Your Thread
                                        <span className=' whitespace-nowrap'>{formatTimeElapsed(e.createdAt)} </span>
                                </Link>
                                    


                </div>
            </div>
              
        ))}
</div>

    </div>
  )
}

export default page