import { ClerkProvider, currentUser } from '@clerk/nextjs'
import '../globals.css'
import type { Metadata } from 'next'
import Nav from '@/components/navigation/Nav'
import RightBar from '@/components/navigation/RightBar'
import LeftBar from '@/components/navigation/LeftBar'
import { findUser } from '@/lib/mongodata/core'
import { redirect } from 'next/navigation'
import BackgroundChanger from '@/components/display/Toggler'




export const metadata: Metadata = {
  title: 'threads-clone',
  description: 'thrads clone by nextjs',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  const user = await currentUser() || {id:""}
  
  const userdb  = await findUser(user.id)

  if(!userdb?.onboarded) redirect("/onboarding")

  return (
   
     <ClerkProvider>
                <html lang="en" className={` min-h-[120dvh] transition-all duration-1000  bg-fixed bg-no-repeat bg-cover
                bg-[url(/body-bg.svg)]
                bg-black`}>
      <body className= {`bg-fixed text-white
         dark:text-white  min-h-[120dvh] `}>

           <Nav image={userdb.image} />
      <main className=" flex max-md:block  pt-[120px] ">
        <LeftBar/>

      <section className='px-10 max-md:px-4 max-sm:px-2 flex-1 flexcenter mb-5 rounded-2xl '>

        <div className=" flex justify-center  w-full ">
          {children}
        </div>
                
          </section>
     
    </main>

 
        </body>
        <BackgroundChanger/>
    </html>
     </ClerkProvider>

     

    
  )
}
