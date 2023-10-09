import ThreadCard from '@/components/display/ThreadCard'
import ProfileBar from '@/components/navigation/ProfileBar'
import { findUser, getThreadsbyType } from '@/lib/mongodata/core'
import { SignedIn, UserButton, currentUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import {dark} from "@clerk/themes";
import React from 'react'


type props = {

  _id: string;
  id:string;
  __v: number;
  bio: string;
  image: string;
  name: string;
  onboarded: boolean;
  threads: any[]; 
  username: string;
}

const page =async ({searchParams:{target="threads"},params:{id}}:{searchParams:{target:string},params:{id:string}}) => {


    const userfromdb:props  = await findUser(id)
    const user = await currentUser();
    const currentusefromdb = await findUser(user?.id || "");
    const wantedThreads =  await getThreadsbyType(userfromdb._id ,
 target == "threads" ? false 
 : target == "replies"? true : false
 )



  return (<>  
   <div className=' w-full gap-6 mt-14 max-sm:mt-6'>
    
        
                
                <div className="flex items-center max-sm:justify-center
                max-md:flex-wrap border-b justify-between max-sm:gap-10 border-gray-400 py-6 mb-6 gap-2">

                <div className="flex gap-4">
                                <div className="relative  overflow-hidden min-w-[80px] h-[80px] rounded-full ">
                            <Image src={userfromdb.image} fill className="object-cover" alt='your image ' /> 
                            {user?.id === id  &&  <Link href={"/onboarding"} className="absolute h-full w-full opacity-0 transition-all
                            hover:opacity-100 bg-secondary-500  flexcenter ">
                                    <Image src="/pencil.svg" alt='pencil' height={40}  width={40}  />
                            </Link>}

                        </div>

                    
                            <div className=' flex  flex-col '>
                                <p className="text-2xl font-bold mb-2">{userfromdb.name}  </p>
                                <div className="text-gray-500">@{userfromdb.username} </div>
                            </div>

                            
                    </div>
                    {currentusefromdb.id === id && <SignedIn   >
                            <div className=' transition-all  flexcenter p-2 max-sm:px-10 hover:scale-105 border-white border-[2px] shadow-slate-200 shadow-md     backdrop-blur-sm  rounded-xl flex-col gap-6'>
                                    <p className=' text-xl font-bold'>Manage your clerk Profile </p>
                            <UserButton   appearance={{baseTheme:dark,layout:{shimmer:true}, elements:{ avatarBox:"h-[70px] duration-700 transition-all  w-[70px]",avatarImage:"object-cover"}}}/>
                    
                            </div>
                        </SignedIn>}
                    
            
                    

                </div>
                <div className="text-gray-500 mb-16">{userfromdb.bio} </div>
            

            <div className='mt-10 backdrop-blur-md pb-3  border-dark-2 border-[1px]  rounded-lg'>
                <ProfileBar/>
                <div className="mt-10">
                    {wantedThreads?.map(e=>(
                        <ThreadCard key={e} data={e}/>
                    ))}
                </div>
            </div>
        
    </div>
  </>
 
  )
}

export default page