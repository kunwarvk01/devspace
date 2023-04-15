import express from "express";// Import the express library to use for creating the router
import { login } from "../controllers/auth.js"; // Import the login function from the auth controller

// Create a new router instance using the express.Router() method
const router = express.Router();
// Define a route for handling login requests with a POST method, and call the login function from the auth controller
router.post("/login", login);


export default router;