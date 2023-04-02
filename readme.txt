DevSpace{
    Server{
        npm i -g nodemon
        npm i {
            express        [library for server]
            body-parser    [extracts data from requests]
            bcrypt         [python library for hashing]
            cors           [cross origin resource sharing]
            dotenv         [loading environment variables]
            gridfs-stream  [uploading media]
            multer         [file upload and validation]
            multer-gridfs-storage 
            helmet         [request safety]
            jsonwebtoken   [authentication]
            mongoose       [mongoDB access]
        }
        npm init -y [initializes a new project and adds metadata and dependencies]

        package.json { add "type" : "module" }
        index.js { 
            import all the modules
            connect mongoDB database
            configure the .env file 
            configure mongoose and start the server
            link and configure ./controllers/auth.js 
            go to routes/auth.js and configure other routes
        }
        MIDDLEWARE = functions that run in between requests
    }

    controllers{
        auth.js{
            import bcrypt, jwt, and User from models
            export register as async function {
                try catch block{
                    destructure the request
                    hash the password
                    make a newUser with the hashed password
                    const savedUser = await newUser.save();
                    send back the user if created
                    else send back the err message
                }
            }
        }
    }

    routes{
        auth.js{
            import {login} from controllers/auth.js
            export router at /login address;
        }
    }
}