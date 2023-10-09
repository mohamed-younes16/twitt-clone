import { ThreadCardTabs } from '@/constants.index';
import { formatDateString } from '@/lib/utils';
import { User } from '@/schemas/user'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import Infinite from './Infinit';

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
}


const ThreadCard =async  ({data,reply,comment,replies,last=false}:
    {data:Datatype,reply?:boolean,comment?:boolean,replies?:any,last?:boolean}) => {

    const threadOwner:UserData  = await User.findById(data?.author).exec()  

return (
<div className=' bg-dark-1 shadow-black md:hover:scale-[102%]   duration-500 transition-all hover:shadow-[0px_0px_15px_0px_#373737]   p-6 rounded-2xl m-2 '>
    <div className="flex gap-10">

   
    <div className=" relative">
            <Link  href={`/profile/${threadOwner?.id}`} 
                    className=' hover:rotate-[360deg] z-20 flex transition-all
                        duration-300 relative rounded-full w-[55px]
                    h-[55px] overflow-hidden
                                border-white border-2  '>  
                                    <Image src={threadOwner.image } className='bg-black object-cover' fill alt=''/>
                        
            </Link>
            <div className="absolute w-[1px] h-full bg-white top-0 left-1/2 z-0 -translate-x-1/2  "/>
    
    </div>

    <div className=' mb-5'>
            <p className="font-bold mb-2 text-xl max-sm:text-lg  whitespace-nowrap">{threadOwner.username} </p>

            <p className="text-gray-400">{data.content} </p>
            <div className="flex gap-6 mt-10 "> 

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

    {replies &&  <div className=' flex items-center justify-start mt-3  gap-4'>
        <div   className=' w-[50px]  h-[40px] relative'>
                {replies?.images?.slice(0,3).map((e:any,i:number)=>(

            <div  style={{translate:`${i * 10}px 0px `}} key={e} className=' absolute top-0 left-0 
            rounded-full w-[35px]  min-h-[35px]
            overflow-hidden
            '>  
                <Image src={e }  fill alt=''/>
            
            </div>
        
        ))} 
        </div>
        <p>
            replies {replies?.repliesLength}
        </p>


      </div>}
       <div className="text-gray-400 mt-4">{ formatDateString(data.createdAt) } </div>
       {last && <Infinite/>}
</div>
)
}

export default ThreadCard