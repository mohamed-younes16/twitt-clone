import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
type User = {
    _id: string;
    id: string;
    __v: number;
    bio: string;
    image: string;
    name: string;
    onboarded: boolean;
    threads: any[]; // You can replace 'any[]' with a specific type if needed
    username: string;
  };
const ProfileCard = ({data}:{data:User}) => {

  return (
    <Link  href={`/profile/${data.id}`} className=' w-full my-6 flex items-center justify-between'>
        <div className="flex gap-6"> 
        <div className="relative cursor-pointer overflow-hidden min-w-[60px] h-[60px] rounded-full ">
                        <Image src={data.image} fill className="object-cover" alt='your image ' /> 
                        <Link href={`/profile/${data.id}`} className="absolute h-full w-full opacity-0 transition-all
                        hover:opacity-100 bg-secondary-500  flexcenter ">
                                <Image src="/person.svg" alt='pencil' height={40}  width={40}  />
                        </Link>
                    </div>

                    <div>
                        <p className="text-xl font-bold mb-2">{data.name}  </p>
                        <div className="text-gray-500">@{data.username} </div>
                    </div> 
        </div>
        <Link className=' bg-primary-500  rounded-full p-2 transition-all 
        px-4 hover:bg-purple-700 text-lg font-bold' href={`/profile/${data.id}`}>
            View
        </Link>
    </Link>
  )
}

export default ProfileCard