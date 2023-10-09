import * as z from "zod"


export const threadevalidation = z.object({
content:z.string().nonempty({message:"must be at least 10 characters long"}).min(10,{message:"must be at least 10 characters long"}),

}) 