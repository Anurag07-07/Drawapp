import z from 'zod'

export const SignupValidation = z.object({
  email:z.string().min(5).max(50),
  username:z.string().min(5).max(25).regex(/[A-Z]/),
  password:z.string().min(5).max(25),
})

export const SigninValidation = z.object({
  username:z.string().min(5).max(25).regex(/[A-Z]/),
  password:z.string().min(5).max(25),
})
