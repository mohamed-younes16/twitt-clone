import ProfileCard from '@/components/display/ProfileCard'
import SearchForm from '@/components/forms/SearchForm'

import { findUser, searchUsersByName } from '@/lib/mongodata/core'
import { currentUser } from '@clerk/nextjs'
import React from 'react'

const page =  async ({searchParams:{search}}:{searchParams:{search:string}}) => {
    const user = await currentUser() || {id:""}
  
    const userdb  = await findUser(user.id)
    const searchedUsers = await searchUsersByName(search,userdb.username)
    
  return (
    <div className=' w-full '>
        <p className="text-2xl font-bold">Search For People </p>
        <SearchForm/>
        <div className=' backdrop-blur-sm bg-dark-1 bg-opacity-50 p-2 rounded-xl mt-6'>
            {searchedUsers.map(e=>(
                <ProfileCard key={e} data={e}/>
            ))}
        </div>
    </div>
  )
}

export default page 