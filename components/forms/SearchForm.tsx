/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'
import { Input } from '../ui/input'

const SearchForm = () => {
  const [search , setSearch ]  =  useState('')
  const router = useRouter()
const path = usePathname()
  useEffect(() => {
    
    const bounce = setTimeout(() => {
    

    
     router.push(`${path}?search=${search.toLowerCase()}`)


    },500)
return ()=> clearTimeout(bounce)
}, [search])



  return (
    <form className='  mt-10 w-full max-w-[700px] flex items-center justify-center'>
            <label  className='max-md:w-[80%] p-4 bg-black-400
             rounded-2xl bg-dark-4  gap-6 w-full flex'> 

                <Image src={`/search.svg`} height={40} width={40 } alt='search logo'/>
                <Input placeholder="search...." value={search} onChange={e=>setSearch(e.target.value)}
                className="
                !bg-dark-4 border-0  text-xl  !ring-0  !ring-offset-0" />
            </label>

    </form>
  )
}

export default SearchForm