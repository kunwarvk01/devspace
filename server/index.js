import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import multer from 'multer';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import { register } from './controllers/auth.js';


/*  CONFIGURATIONS  */ 
// only needed when you use "type" module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config(); // invoking dotenv.config
const app = express(); //invoking express
// app.use() is used to mount functions/middleware into the root level of application
app.use(express.json()); //parse incoming JSON requests
app.use(helmet()); //invoking helmet
app.use(helmet.crossOriginResourcePolicy({ policy:"cross-origin" }));
app.use(morgan( "common" ));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended:true }));
app.use(cors);
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); // sets directory to store data locally 


/*  FILE STORAGE */ 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/assets/");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
}); //saves the files in the specified directory
const upload = multer({ storage }); // variable to save the files


/*  ROUTES WITH FILES   */
app.post("/auth/register", upload.single("picture"), register); //routes to auth and middleware uploads the media. register function(controller) is carried out at last
/*  ROUTES  */
app.use("/auth", authRoutes)

/*  MONGOOSE SETUP  */
const PORT = process.env.PORT || 6001; //6001 will work when the port is busy
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch(err => console.error(`${err} did not connect`));


// Authentication - authenticate and log in
// Authorization - make sure the user is logged in