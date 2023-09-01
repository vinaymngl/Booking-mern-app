import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        const user = await User.findOne({ username: req.body.username });
        if (user) return next(createError(404, "User already exist with given username"));
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            isAdmin: req.body.isAdmin,

        })

        await newUser.save();
        res.status(201).send("User created successfully");
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User doest not exist"));
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, "password is not correct"));
        const token = jwt.sign({ id: user._id, admin: user.isAdmin }, process.env.JWT)
        const { password, isAdmin, ...otherDetails } = user._doc;

        res.cookie("access_token", token,
            { httpOnly: true })
            .status(200).json({ details: { ...otherDetails }, isAdmin, token });
    } catch (err) {
        next(err);
    }
}

export const checkDetails = async (req, res, next) => {
    try {
        const existingUser = await User.findOne({ email: req.query.email });
        const existingUsername = await User.findOne({ username: req.query.username });
        // console.log([existingUser,existingUsername]);
        res.status(200).send(!!existingUser || !!existingUsername)

    } catch (err) {
        console.log(err);
        next(err);

    }
}

export const loginController = async (req, res) => {
    if (req.body.googleAccessToken) {
        // gogole-auth
        const { googleAccessToken } = req.body;

        axios
            .get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${googleAccessToken}`
                }
            })
            .then(async response => {
                const firstName = response.data.given_name;
                const lastName = response.data.family_name;
                const email = response.data.email;
                const picture = response.data.picture;

                const existingUser = await User.findOne({ email })

                if (!existingUser)
                    return res.status(404).json({ message: "User don't exist!" })

                const token = jwt.sign({
                    email: existingUser.email,
                    id: existingUser._id
                }, process.env.JWT, { expiresIn: "1h" })

                res
                    .status(200)
                    .json({ result: existingUser, token })

            })
            .catch(err => {
                res
                    .status(400)
                    .json({ message: "Invalid access token!" })
            })
    } else {
        // normal-auth
        const { email, password } = req.body;
        if (email === "" || password === "")
            return res.status(400).json({ message: "Invalid field!" });
        try {
            const existingUser = await User.findOne({ email })

            if (!existingUser)
                return res.status(404).json({ message: "User don't exist!" })

            const isPasswordOk = await bcrypt.compare(password, existingUser.password);

            if (!isPasswordOk)
                return res.status(400).json({ message: "Invalid credintials!" })

            const token = jwt.sign({
                email: existingUser.email,
                id: existingUser._id
            }, process.env.JWT, { expiresIn: "1h" })

            res
                .status(200)
                .json({ result: existingUser, token })
        } catch (err) {
            res
                .status(500)
                .json({ message: "Something went wrong!" })
        }
    }

}

export const signupController = async(req, res) => {
    if (req.body.googleAccessToken) {
        const {googleAccessToken} = req.body;

        axios
            .get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                "Authorization": `Bearer ${googleAccessToken}`
            }
        })
            .then(async response => {
                const firstName = response.data.given_name;
                const lastName = response.data.family_name;
                const email = response.data.email;
                const picture = response.data.picture;

                const existingUser = await User.findOne({email})

                if (existingUser) 
                    return res.status(400).json({message: "User already exist!"})

                const result = await User.create({verified:"true",email, firstName, lastName, profilePicture: picture})

                const token = jwt.sign({
                    email: result.email,
                    id: result._id
                }, process.env.JWT, {expiresIn: "1h"})

                res
                    .status(200)
                    .json({result, token})
            })
            .catch(err => {
                res
                    .status(400)
                    .json({message: "Invalid access token!"})
            })

    } else {
        // normal form signup
        const {email, password,  firstName, lastName} = req.body;

        try {
            if (email === "" || password === "" || firstName === "" || lastName === "" && password === confirmPassword && password.length >= 4) 
                return res.status(400).json({message: "Invalid field!"})

            const existingUser = await User.findOne({email})

            if (existingUser) 
                return res.status(400).json({message: "User already exist!"})

            const hashedPassword = await bcrypt.hash(password, 12)

            const result = await User.create({email, password: hashedPassword, firstName, lastName})

            const token = jwt.sign({
                email: result.email,
                id: result._id
            }, process.env.JWT, {expiresIn: "1h"})

            res
                .status(200)
                .json({result, token})
        } catch (err) {
            res
                .status(500)
                .json({message: "Something went wrong!"})
        }

    }
}

