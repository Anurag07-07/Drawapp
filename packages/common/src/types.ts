import z from 'zod'

export const UserValidation = z.object({
  email:z.string().min(5).max(50),
  username:z.string().min(5).max(25).regex(/[A-Z]/),
  password:z.string().min(5).max(25),
})