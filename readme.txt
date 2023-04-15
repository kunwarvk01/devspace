Frontend {
    react - framework
    react router - navigation
    formik + yup - form validation
    redux toolkit - state management
    redux persist - local storage
    react dropzone - image uploads
}
backend{
    nodejs - runtime environment
    express - backend server
    mongoose - managing database
    jwt - authentication
    multer - file upload
}




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
            users.js{
                import User model
                export functions - getUser, getUserConnections, addRemoveConnection
                running the try catch block with the functionalities
            }
        }

        routes{
            auth.js{
                import {login} from controllers/auth.js
                export default router at /login address;
            }
            users.js{
                import { getUser, getUserConnections, addRemoveConnection } from '../controllers/users.js';
                read and update getuser, getUserConnections, addRemoveConnection using router.get and router.patch;
                export default router
            }
        }

        middleware{
            auth.js{
                verifytoken function is used to very the req token
                checks if the token is valid or not.
                adds the result to the user object.
            }
        }
    }
    client{
        npm i {
            react-redux        [state management tool]
            @reduxjs/toolkit   [wrapper for redux]
            redux-persist      [to store redux states in local storage]
            react-dropzone     [drag and drop upload ui etc]
            dotenv             [loading environment variables]
            formik             [form handling]
            yup                [validation]
            react-router-dom@6 [handling routes and pages] 
            @mui/material      [react ui framework]
            @emotion/react
            @emotion/styled
            @mui/icons-material   
        }
    }
}






///////////////////////////////////////////////////////
- set posts in descending order
- friends -> connections
- css 
- dummy data