import ThreadCard from "@/components/display/ThreadCard"

import { getallThreadfromdb } from "@/lib/mongodata/core"
import Image from "next/image"
import Link from "next/link"


export default async function Home({searchParams:{limit}}:{searchParams:{limit:number}}) {

  const allthrads   = await  getallThreadfromdb({limit:limit || 3}) || []



  return (<><main className="relative w-full  bg-dark-4 rounded-2xl  p-10
  max-md:p-4 
  max-w-3xl flex flex-col gap-4 mx-auto">

      {allthrads?.length > 0  ? (allthrads?.map((e,i):any=>(
            <ThreadCard key={e} data={e} reply={true} last={i == allthrads.length - 1 && (limit || 3 )<= allthrads.length }/>
      ))) : <Link href="/create-thread" className=" rounded-xl flexcenter gap-3 bg-primary-500 text-white p-2 w-fit mx-auto ">
            No threads Be the first One who share <Image src="/right-arrow.svg" height={30} width={30} alt="" />
        </Link>}
    </main>

  </>
    
  )
}
