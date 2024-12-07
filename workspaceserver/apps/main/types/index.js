import z from "zod"

const SignupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    type: z.enum(["user","admin"])
})
const SigninSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})
const  avatar= z.object({
    avatar: z.string(),
    password: z.string()
})