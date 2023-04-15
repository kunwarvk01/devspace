import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
// GET user information by id
router.get("/:id", verifyToken, getUser);
// GET user's friend list by id
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
// PATCH (add/remove) friend for a user by id and friendId
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;