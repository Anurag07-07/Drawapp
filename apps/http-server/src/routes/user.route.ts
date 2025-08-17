import express, { Router } from "express";
import { CreateRoom, Signin, Signup } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.js";
const router:Router = express.Router()

router.post('/signup',Signup)
router.post('/signin',Signin)
router.post('/createroom',authMiddleware,CreateRoom)

export default router