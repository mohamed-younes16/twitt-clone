"use client"

import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { profilevalidation } from "@/schemas/validations/profileValidation"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ChangeEvent, useState } from "react"
import Image from "next/image"
import { Textarea } from "../ui/textarea"
import { handleimage, isBase64Image } from "@/lib/utils"
import { useUploadThing } from "@/lib/uploding/uploadthing"
import { updateUser } from "@/lib/mongodata/core"
import { useRouter } from "next/navigation"
import { Toaster, toast } from "sonner"






type props = {
    user : {
    id:string,
    imageUrl:string,

    username: string ,
    bio : string,
    name : string
    }

}

const ProfileForm = ({user}:props) => {
  
    const router = useRouter()

    const [files, setfiles] = useState<File[]>([])

    const {startUpload} = useUploadThing("imageUploader")

    const form = useForm({
        

        resolver:zodResolver(profilevalidation),

        defaultValues:{

            imageUrl:user?.imageUrl ||'',

            username:user?.username|| '',

            bio: user?.bio||'',

            name:user?.name|| ''
        },
        

        mode:"onTouched"
    })
    

    async function onSubmit(v: z.infer<typeof profilevalidation>) {

        const isbase64 = isBase64Image(v.imageUrl)
  

        
        if(isbase64) {
            const res = await  startUpload(files) || []
      
            if(res[0] ) {
                
                v.imageUrl = res[0].url
            }
        }

    try {

    const usertobesend = {...v,id:user.id}
    await  updateUser(usertobesend)

    
    } catch (error:any) {
        console.log(error.message,"_________________")
    }
    
    toast.success("updatedsuccessfully")
    setTimeout(() => {
        router.push("/")
    }, 500);
    

    
    }



return (

<Form {...form} >
    <Toaster/>
    <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">


    <FormField
    control={form.control}

    name="imageUrl"

    render={({ field }) => (


        <FormItem className=" flex items-center   ">

            <FormLabel className=" relative overflow-hidden
            !text-white min-w-[90px] !min-h-[90px] 
            bg-gray-900 rounded-full flexcenter">
                {field?.value ? (
                <Image src={field.value} 
                fill alt="image for you"  />)
                :(<Image src="/profile.svg" height={50} 
                    className=" object-contain" alt="image" width={50}/>)
            
            }
            </FormLabel>

            <FormControl className="account-form_image-input cursor-pointer text-white">
                <Input type="file"   accept="images/*" 
                onChange={e=>handleimage(e , field.onChange,setfiles)} />
            </FormControl>
            
        </FormItem>


        )}
    />




<FormField
    control={form.control}

    name="name"

    render={({ field }) => (


        <FormItem className=" flex flex-col   ">

            <FormLabel className=" !text-white   ">
            Name
            </FormLabel>

            <FormControl className=" text-white">
                <Input className="account-form_input " type="text" {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>


        )}
    /> 


<FormField
    control={form.control}

    name="username"

    render={({ field }) => (


        <FormItem className=" flex flex-col   ">

        <FormLabel className=" !text-white   ">
        Username
        </FormLabel>

        <FormControl className=" text-white">
            <Input className="account-form_input " type="text" {...field} />
        </FormControl>
        <FormMessage />
    </FormItem>


        )}
    />


<FormField
    control={form.control}

    name="bio"

    render={({ field }) => (


        <FormItem className=" flex flex-col   ">

        <FormLabel className=" !text-white   ">
       Bio
        </FormLabel>

        <FormControl className=" text-white">
            <Textarea className="account-form_input "  {...field} />
        </FormControl>
        <FormMessage />
    </FormItem>


        )}
    />

 {form.formState.isValid&& <Button type="submit" disabled={form.formState.isSubmitted} className={`${form.formState.isSubmitting ?" animate-bounce bg-gray-500":"" }`}>Submit</Button> }   
    </form>
</Form>
)
}

export default ProfileForm 
