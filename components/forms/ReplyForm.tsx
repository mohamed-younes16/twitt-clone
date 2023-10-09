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
    FormMessage,
} from "@/components/ui/form"

import { Textarea } from "../ui/textarea"

import { useRouter } from "next/navigation"

import {replyToThread } from "@/lib/mongodata/core"







const ReplyForm = ({id}:{id:string}) => {
  
    const router = useRouter()


    const form = useForm({
        
        resolver:zodResolver(threadevalidation),

        mode:"onTouched"
    })
    

    async function onSubmit(v: z.infer<typeof threadevalidation>) {
        

            try {

            const create = await  replyToThread({ content : v.content,id})
         
        if( create) {
            form.setValue("content","")
        router.refresh()
        }
       
        else {
        console.log("try again_")
        }
            
            } catch (error:any) {
                console.log(error.message)
            }
            
            
    }





return (

<Form {...form}  >
    <form  onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-8 w-full ">

<div className="flexcenter gap-10 max-md:gap-4 w-full">
    <FormField
    control={form.control}

    name="content"

    render={({ field }) => (


        <FormItem className=" flex  gap-4 grow  ">

        <FormControl className=" text-white">

            <Textarea className=" !bg-[#040209] !ring-0 !border-0 "  defaultValue={""}  {...field} />

        </FormControl>
        <FormMessage className=" max-sm:text-sm" />
    </FormItem>


        )}
    />

 <Button type="submit"
  disabled={ !form.formState.isValid || form.formState.isSubmitting}
   className={` transition-all duration-300  leading-[30px] rounded-ful overflow-hidden   !bg-violet-600  text-xl !text-white font-semibold ${form.formState.isValid  ? "!opacity-1 " : "p-0 !opacity-0 w-0" }`}>
    Reply
    </Button>   
</div>

    </form>
</Form>
)
}

export default ReplyForm