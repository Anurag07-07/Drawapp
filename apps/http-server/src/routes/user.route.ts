import express, { Router } from "express";
import { AllChat, CreateRoom, Signin, Signup, StoreChat } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.js";
const router:Router = express.Router()

router.post('/signup',Signup)
router.post('/signin',Signin)
router.post('/createroom',authMiddleware,CreateRoom)
router.post('/storeshape/:roomId',authMiddleware,StoreChat)
router.get('/chat/:roomId',AllChat)

export default router