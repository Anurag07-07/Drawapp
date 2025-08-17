import express, { Router } from "express";
import { Signin, Signup } from "../controllers/user.controller.js";
const router:Router = express.Router()

router.post('/signup',Signup)
router.post('/signin',Signin)

export default router