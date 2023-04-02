import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Authentication - authenticate and log in
// Authorization - make sure the user is logged in

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
};


/*  LOGGING IN   */
export const login = async (req, res) => {
    try{
        const { email, password } = req.body; //destructuring req
        const user = await User.findOne({ email: email }); // find user having same email and store in user
        if (!user) return res.status(400).json({ error: "User does not exist" });
        
        const isMatch = await bcrypt.compare(password, user.password); // compare password
        if (!isMatch) return res.status(400).json({ error: "Invalid Credentials"});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ user, token });
    } catch (err){
        res.status(500).json({ error: err.message });
    }
}
