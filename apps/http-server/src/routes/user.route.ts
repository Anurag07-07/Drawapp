import express, { Router } from "express";
import { Signup } from "../controllers/user.controller.js";
const router:Router = express.Router()

router.post('/signup',Signup)

export default router