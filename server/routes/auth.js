import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router(); // assigns an instance of Router class

router.post("/login",login);

export default router; 