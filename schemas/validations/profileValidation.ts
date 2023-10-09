import * as z from "zod"


export const profilevalidation = z.object({
username:z.string().nonempty({message:"must be at least 5 characters long"}).min(5,{message:"must be at least 5 characters long"}),
imageUrl:z.string().nonempty(),
name:z.string().nonempty({message:"must be at least 4 characters long"}).min(4,{message:"must be at least 4 characters long"}),
bio:z.string().nonempty({message:"must be at least 8 characters long"}).min(8,{message:"must be at least 8 characters long"}),
}) 