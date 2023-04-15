// Importing required modules and libraries
import bcrypt from "bcrypt"; // Importing the bcrypt module for password hashing
import jwt from "jsonwebtoken"; // Importing the jsonwebtoken module for generating tokens
import User from "../models/User.js"; // Importing the User model from the models directory

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    // Destructure user information from request body
    const { firstName, lastName, email, password, picturePath, friends, location, occupation } = req.body;

    // Generate a salt and hash the user's password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new User object with the hashed password and other user info
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    // Save the new user to the database and send the user data as a response
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    // If there's an error, send a 500 error response with the error message
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    // Destructure email and password from request body
    const { email, password } = req.body;

    // Find the user with the given email in the database
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    // Compare the provided password with the user's hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    // If the password matches, generate a JSON Web Token (JWT) with the user's ID and send it as a response
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Remove password from the user object before sending it as a response
    delete user.password;

    // Send the JWT and user data as a response
    res.status(200).json({ token, user });
  } catch (err) {
    // If there's an error, send a 500 error response with the error message
    res.status(500).json({ error: err.message });
  }
};
