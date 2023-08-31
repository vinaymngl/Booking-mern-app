import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const register = async(req,res,next) =>{
    try{
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        const user= await User.findOne({username:req.body.username});
        if(user) return next(createError(404,"User already exist with given username")); 
        const newUser = new User({
            username: req.body.username,
            email : req.body.email,
            password : hash,
            isAdmin : req.body.isAdmin,

        })

        await newUser.save();
        res.status(201).send("User created successfully");
    }catch(err){
        next(err);
    }
};

export const login = async(req,res,next) =>{
    try{
        const user = await User.findOne({username : req.body.username});
        if(!user ) return next(createError(404, "User doest not exist"));
        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
        if(!isPasswordCorrect) return next(createError(400, "password is not correct"));
        const token = jwt.sign({id : user._id, admin : user.isAdmin}, process.env.JWT)
        const {password, isAdmin, ...otherDetails} = user._doc;
        
        res.cookie("access_token", token, 
        {httpOnly : true})
        .status(200).json({details: {...otherDetails},isAdmin,token});
    }catch(err){
        next(err);
    }
}

export const checkDetails = async(req,res,next)=>{
    try{
        const existingUser = await User.findOne({ email:req.query.email});
        const existingUsername = await User.findOne({username:req.query.username});
        // console.log([existingUser,existingUsername]);
        res.status(200).send(!!existingUser || !!existingUsername)

    }catch(err){
        console.log(err);
        next(err);

    }
}