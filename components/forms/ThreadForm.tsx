"use client"

import { useForm } from "react-hook-form"

import {zodResolver} from "@hookform/resolvers/zod"

import { threadevalidation } from "@/schemas/validations/ThreadValidation"

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

import { Textarea } from "../ui/textarea"

import { useRouter } from "next/navigation"

import { createThreadtodb } from "@/lib/mongodata/core"
import { Toaster, toast } from "sonner"
import Image from "next/image"
import { Input } from "../ui/input"
import { handleimage, isBase64Image } from "@/lib/utils"
import { useState } from "react"
import { useUploadThing } from "@/lib/uploding/uploadthing"







const ThreadForm = () => {
  
    const router = useRouter()

    const {startUpload} = useUploadThing("imageUploader")
 
    const [files, setfiles] = useState<File[]>([])

    const form = useForm({
        
        resolver:zodResolver(threadevalidation),

        mode:"onTouched"
    })
    

    async function onSubmit(v: z.infer<typeof threadevalidation>) {
        
        const isbase64 = isBase64Image(v.imageUrl)
  

        
        if(isbase64) {
            const res = await  startUpload(files) || []
      
            if(res[0] ) {
                
                v.imageUrl = res[0].url
                console.log(v)
            }
        }


    try {
    

    const create = await  createThreadtodb({ content : v.content ,isReply:false,imageUrl:v.imageUrl})
  
        if( create) {
        form.setValue("content","")
        toast.success("created successfully",{})
        setTimeout(() => {
            router.push("/")

    }, 500);

}
else {
    toast.error("error happened",)


}
    
    } catch (error:any) {
        console.log(error.message)
    }
    
    }



return (

<Form {...form}  >
<Toaster richColors/>
    <form  onSubmit={form.handleSubmit(onSubmit as any)} 
    className="space-y-8 max-sm:min-w-[350px] min-w-[600px] ">


<FormField
    control={form.control}

    name="content"

    render={({ field }) => (


        <FormItem className=" flex flex-col   ">

        <FormLabel className=" !text-white max-sm:!text-heading3-bold  !text-heading2-bold mb-6  ">
        content
        </FormLabel>

        <FormControl className=" text-white">

            <Textarea className="account-form_input " rows={5}  {...field} />

        </FormControl>
        <FormMessage />
    </FormItem>


        )}
    />

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

 <Button type="submit"
  disabled={form.formState.isSubmitting || form.formState.isSubmitted}
   className={` transition-all duration-300  leading-[30px] rounded-ful overflow-hidden   !bg-violet-600  text-xl !text-white font-semibold ${form.formState.isValid  ? "!opacity-1  scale-100" : "scale-0  w-0 h-0 !opacity-0" }`}>
    Submit
    </Button>   
    </form>
</Form>
)
}

export default ThreadForm