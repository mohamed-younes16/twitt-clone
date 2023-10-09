import { SignedIn, currentUser } from '@clerk/nextjs'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const Nav = async ({image}:{image:string}) => {


  return (

    <nav className=' flex justify-between  items-center 
            w-full fixed top-0 left-0 z-40  p-6  backdrop-blur-md 
            border-b-[1px] max-md:p-4 border-white border-opacity-50 '>
                <div>
                  <Link href='/' className=' flexcenter gap-6 '>  
                    <Image src='/logo.svg' height={40} width={40} alt=''/>
                    <h1 className=" text-heading2-bold max-md:text-heading3-bold font-bold">Threads </h1>
                  </Link>

                </div>
                <SignedIn>
                  <div className="flexcenter    gap-6">
                  <Link href='/onboarding' className=' hover:rotate-[360deg]
                 transition-all 
                  duration-300 relative rounded-full min-w-[65px] min-h-[65px]
                   overflow-hidden
                    border-white border-2  '>  
                      <Image src={image } fill alt='' className=' object-cover'/>
                    
                  </Link>

         
            
            </div>
                </SignedIn>
           
            
    </nav> 
  )
}

export default Nav