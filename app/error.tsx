/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import {useEffect} from 'react'

import { WifiIcon , ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { useRouter} from 'next/navigation'

const Error = ({err }:{err:any}) => {
    const router =useRouter()
    
    useEffect(() => {
    console.error(err)
    }, [])
    


  return (
    <div className=' 
    
     dark:text-black
                from-slate-100 z-[1000]  to-[#cac6e7]  dark:from-[#09090e] bg-fixed dark:from-[80%] 
                dark:to-[#131120] bg-gradient-to-b  
    

    
    w-screen h-screen fixed inset-0 flex flex-col gap-4 justify-center items-center'>
        <p className="text-3xl   animate-pulse text-primary-purple font-bold">Check your connection  </p>
        <span className="flex  animate-pulse   text-primary-purple "><ExclamationTriangleIcon className=' h-10'/> <WifiIcon className=' h-10'/>  </span>  
        <div className="flex gap-4">

                <button className="bg-white  text-2xl hover:text-white   p-2 transition dark:hover:bg-[#270227] hover:bg-black rounded-lg" onClick={()=>location.reload()} >try Again </button>
                <button className="bg-white  text-2xl w-28  hover:text-white transition dark:hover:bg-[#270227] hover:bg-black rounded-lg"onClick={()=>router.push("/")}> Home </button>
            </div>
    </div>
  )
}

export default Error