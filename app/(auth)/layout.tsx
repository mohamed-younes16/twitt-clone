import { ClerkProvider } from '@clerk/nextjs'
import '../globals.css'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'threads-clone authentication',
  description: 'thrads clone by nextjs',
}

export default function RootLayout({
children,
}: {
  children: React.ReactNode
}) {
return (
    <ClerkProvider>
      <html lang="en">

        <body className='  bg-[url(/body-bg.svg)] bg-fixed bg-cover text-white  h-screen '>
          {children}
          
          </body>
    
    </html>
    </ClerkProvider>
    
)
}
