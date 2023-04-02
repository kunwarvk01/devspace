import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/*  REGISTER USER   */
export const register = async(req, res) => {
    try{
        const {
            firstName, 
            lastName, 
            email, 
            password,
            picturePath,
            connections,
            location,
            occupation
        } = req.body; // destructuring the req

        const salt =  await bcrypt.genSalt(); // generate random salt
        const passwordHash = await bcrypt.hash(password, salt); // hash password

        const newUser = new User({
            firstName, 
            lastName, 
            email, 
            password: passwordHash,
            picturePath,
            connections,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000)
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); // res back savedUser as json
    } catch (err){
        res.status(500).json({ error: err.message });
    }
}