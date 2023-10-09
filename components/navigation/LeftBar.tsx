"use client"

import { sidebarLinks } from "@/constants.index"
import { SignOutButton, useAuth } from "@clerk/nextjs";
import Image from "next/image"

import { usePathname, useRouter } from "next/navigation"
import logouticon from "@/public/logout.svg"
import { useEffect, useState } from "react";


const LeftBar = () => {
    const pathname = usePathname()
    const [open , setopen] = useState(false)
    const [visible , setvisible] = useState(true)
    const { userId } = useAuth();
    const router = useRouter()

    const isPcUser = () => {
        const userAgent = navigator.userAgent.toLowerCase();
        
        const pcKeywords = ['windows', 'macintosh', 'linux'];
            for (const keyword of pcKeywords) {
                if(userAgent.toLowerCase().includes("android") || userAgent.toLowerCase().includes("iphone")) {
                    return false;
                }
            else if (userAgent.toLowerCase().includes(keyword)) {
                
                return true;
            }
            }
        
          
        };
    

        useEffect(() => {
        function trackMousePosition(event: { clientX: number; }) {
            if (isPcUser() ) {
                    ((event.clientX / window.innerWidth ) * 100) < 10   ? setvisible(true) :setvisible(false);
            }
            else if (window.innerWidth <= 800){
                setvisible(true)
            }
        
        }

        document.addEventListener('pointermove', trackMousePosition)
        
        return () => document.removeEventListener('pointermove', trackMousePosition);
            

        }, [])
        
    return (
        <div  className={`fixed duration-700 top-0 transition-all 
        max-w-fit z-50  bg-[#040209]  p-6 flex flex-col 
    max-h-[calc(100dvh-100px)] pt-[120px] min-h-full justify-between left-0
    ${open ? "translate-x-0" : "-translate-x-full"}

    `}>
        
            <button className={`absolute  z-[888] cursor-pointer
            ${ open ? " hover:shadow-red-400":" hover:shadow-emerald-400"}
            bottom-[120px]  shadow-lg  !rounded-full right-0 ${visible || open ? "translate-x-full hover:shadow-emerald-400":" hover:shadow-red-400"}
            bg-[#040209] p-1 delay-100  transition-all`}
            onClick={()=> setopen(s=>!s)}>
                <Image src="/right-arrow.svg" height={60} width={60} 
                alt="toggle menu " style={{transitionDuration:"700ms"}}  className={`transition-all   animate-[pulse_3s_infinite_ease-out] ${open ?"rotate-180":""}`} />
            </button>

            <button onClick={()=>setopen(false)} className="ml-2 rounded-full text-white p-2  top-4 right-4
            absolute hover:shadow-[red]   shadow-md transition-all ">
                <Image alt="close" src="/close.svg" height={40} width={40}/>
            </button>

            <ul>
                {sidebarLinks.map(e=>{
                
                if (e.route === "/profile") e.route = `/profile/${userId}`;
                return (
                    
                <li key={e.label}>          
                    <button  onClick={()=>{
                    router.push(e.route);
                    setopen(false)}}  className={`my-3  w-full hover:bg-primary-500 transition-all   flex gap-6
                                        p-3 text-xl rounded-lg ${pathname == e.route ? "bg-primary-500": ""}`}>
                        <Image src={e.imgURL} height={30} width={30} alt="logo"/>
                        {e.label}
                        
                    </button>
                    
                </li>)})}
            </ul>
            
            <SignOutButton  >
                <div className="flexcenter gap-6 cursor-pointer">
                <Image src={logouticon} height={30} width={30} className=" " alt=" logot logo "/>
                    <p>Log-out</p>
                </div>
            
            </SignOutButton>
                

        </div>
    )
    }

    export default LeftBar