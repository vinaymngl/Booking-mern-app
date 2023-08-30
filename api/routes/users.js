import  express  from "express";
import {  deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import User from "../models/User.js";
import { createError } from "../utils/error.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();
router.get("/checkauthentication", verifyToken, (req,res,next)=>{
res.send("You are authenticated")
});
router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
    res.send("You are logged in and can delete your account")
});
router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
    res.send("hello admin and can delete your account")
})
//UPDATE
router.put("/:id" ,verifyUser, updateUser);
//GET
router.get("/:id" ,verifyUser, getUser);
//GET ALL
router.get("/" ,verifyAdmin, getUsers); 
//DELETE
router.delete("/:id" ,verifyUser, deleteUser);

export default router;