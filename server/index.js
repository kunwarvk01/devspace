// Importing required modules and libraries
import express from "express"; // Importing Express framework for building web applications
import bodyParser from "body-parser"; // Importing body-parser for parsing incoming request bodies
import mongoose from "mongoose"; // Importing Mongoose for interacting with MongoDB database
import cors from "cors"; // Importing cors for handling cross-origin resource sharing
import dotenv from "dotenv"; // Importing dotenv for handling environment variables
import multer from "multer"; // Importing multer for handling file uploads
// import helmet from "helmet"; // Importing helmet for adding security headers to responses
import morgan from "morgan"; // Importing morgan for logging HTTP requests and responses
import path from "path"; // Importing path for working with file paths
import { fileURLToPath } from "url"; // Importing fileURLToPath for converting file URL to file path
import authRoutes from "./routes/auth.js"; // Importing auth routes
import userRoutes from "./routes/users.js"; // Importing user routes
import postRoutes from "./routes/posts.js"; // Importing post routes
import { register } from "./controllers/auth.js"; // Importing register controller function
import { createPost } from "./controllers/posts.js"; // Importing createPost controller function
import { verifyToken } from "./middleware/auth.js"; // Importing verifyToken middleware function
// import User from "./models/User.js"; // Importing User model
// import Post from "./models/Post.js"; // Importing Post model
// import { users, posts } from "./data/index.js"; // Importing sample user and post data

// Defining constants
const __filename = fileURLToPath(import.meta.url); // Getting file path of current module
const __dirname = path.dirname(__filename); // Getting directory path of current module
dotenv.config(); // Loading environment variables from .env file

// Creating an instance of express app
const app = express();

// Middleware setup
app.use(express.json()); // Parsing incoming requests with JSON payloads
// app.use(helmet()); // Adding security headers to responses
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Configuring CORS policy
app.use(morgan("common")); // Logging HTTP requests and responses
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Configuring JSON body parser
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // Configuring URL-encoded body parser
app.use(cors()); // Allowing cross-origin resource sharing
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // Serving static files

// Setting up file storage with multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Configuring file storage destination
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    // Configuring file name for storage
    cb(null, file.originalname);
  },
});
const upload = multer({ storage }); // Creating multer instance with storage configuration

// Handling routes with files
app.post("/auth/register", upload.single("picture"), register); // Handling register route with file upload middleware and register controller
app.post("/posts", verifyToken, upload.single("picture"), createPost); // Handling create post route with token verification middleware and createPost controller

// Handling other routes with imported routers
app.use("/auth", authRoutes); // Handling auth routes with authRoutes
app.use("/users", userRoutes); // Handling user routes with userRoutes
app.use("/posts", postRoutes); // Handling post routes with postRoutes

// Setting up and starting mongoose database
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true, // Use new URL parser
    useUnifiedTopology: true, // Use new server discovery and monitoring engine
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));
