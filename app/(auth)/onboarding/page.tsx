import ProfileForm from '@/components/forms/ProfileForm'
import { findUser } from '@/lib/mongodata/core'
import { User } from '@/schemas/user'
import { currentUser } from '@clerk/nextjs'

import React from 'react'

const page = async () => {

  const user = await currentUser() 
  
  const userdb = await findUser(user?.id || "")


  const userdata : any = {
    id:user?.id ,
    imageUrl:userdb?.image || user?.imageUrl,

    username: user?.username || userdb?.username ,
    bio : userdb?.bio || "",
    name : user?.firstName || userdb?.name ||""
  }
  return (
    <div className=' h-screen max-w-[1000px] px-4 mx-auto flex  md:px-16  flex-col  pt-20 '>
      <div className='   p-10   transition-all   backdrop-blur-lg rounded-xl
       border-white border-[1px]   '>
        <h1 className=' text-heading2-semibold mb-4 animate-pulse  '>OnBoarding</h1>
      <p> Complete Your Profile Now</p>
      <div className="bg-dark-3  my-20 rounded-xl p-6">
        <ProfileForm user={userdata} />
      </div>
      </div>
     
     
    </div>
  )
}

export default page