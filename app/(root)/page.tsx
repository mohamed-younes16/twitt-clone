import ThreadCard from "@/components/display/ThreadCard"

import { getallThreadfromdb } from "@/lib/mongodata/core"


export default async function Home({searchParams:{limit}}:{searchParams:{limit:number}}) {

  const allthrads   = await  getallThreadfromdb({limit:limit || 5})
 

  return (<><main className="relative w-full  bg-dark-4 rounded-2xl  p-10
  max-md:p-4
   max-w-3xl flex flex-col gap-4 mx-auto">

      {allthrads?.map((e,i):any=>(
            <ThreadCard key={e} data={e} last={i == allthrads.length - 1 }/>
      ))}
    </main>

  </>
    
  )
}
