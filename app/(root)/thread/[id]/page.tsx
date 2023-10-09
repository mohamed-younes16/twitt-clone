
import ThreadCard from '@/components/display/ThreadCard'
import ReplyForm from '@/components/forms/ReplyForm'
import { findUser, findUsersbyList, getSpecificThread, getThreads } from '@/lib/mongodata/core'
import { currentUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const page =async ({params:{id}}:{params:{id:string}}) => {

const targetThread = await getSpecificThread(id )
const otherReplies : any[] = await getThreads(targetThread.children) || []
const repliesAuthors = await findUsersbyList(otherReplies.map(e=>e.author)|| [])

const replyImages = {
    images:Array.from(new Set(repliesAuthors?.map(e => e.image)))
    ,repliesLength:otherReplies.length
};


const user = await currentUser() || {id:""}

const userdb  = await findUser(user.id)

if(!userdb?.onboarded) redirect("/onboarding")

return (<div className=' grow  bg-[#040209]  max-w-3xl' >

<main className="relative w-full bg-dark-4 rounded-2xl  max-sm:p-2 p-6 max-w-3xl mx-auto">
                <ThreadCard replies={replyImages} reply={true} data={targetThread}/>

    </main>
            <div className='mt-10 !bg-[#1f1f22]  flexcenter gap-4 rounded-2xl p-5 max-sm:p-2'>
                <Link href='/onboarding' className=' hover:rotate-[360deg]
                transition-all 
                duration-300 block relative rounded-full min-w-[45px] min-h-[45px]
                overflow-hidden
                '>  
                    <Image src={userdb.image } fill alt=''/>
                
                </Link>

                <ReplyForm id={id} />
            </div>
            <div className=' py-6 flex flex-col gap-6 mt-6 rounded-xl bg-[#040209]'>
                    {otherReplies.map(e=>(
                        <ThreadCard data={e} key={e} reply={true} comment={true}/>
                    ))}
            </div>

  </div>


    
)
}

export default page