import express from 'express';
import {
    getUser,
    getUserConnections,
    addRemoveConnection
} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser); //gets the user
router.get("/:id/friends", verifyToken, getUserConnections); //grabs users friends

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveConnection);

export default router;
