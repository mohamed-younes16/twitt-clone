"use client"

import { profileTabs } from '@/constants.index'
import Image from 'next/image'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const ProfileBar = () => {
const router=  useRouter()
const path  = usePathname()
const  params = useSearchParams()

  return (
    <div className=' flex bg-dark-4 rounded-t-lg overflow-hidden '>
        {profileTabs.map(e=>(
              <button key={e.value} className={`gap-6 flexcenter max-md:text-lg text-2xl py-2 max-md:gap-1 hover:bg-slate-800 transition
                grow ${params.get("target") == e.value ? "bg-slate-600" :"" } ${e.value == "threads" && !params.get("target")  ?"bg-slate-600":""}`} 
                onClick={()=>router.push(`${path}?target=${e.value}`)}
                >
                  <Image  className=' max-md:h-[20px] ' src={e.icon} height={40} width={40} alt={e.value+ " icon"} />
                  <p className="font-semibold"> {e.label}</p>
              </button>
        ))}
    </div>
  )
}

export default ProfileBar