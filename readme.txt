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
            connect mongoDB database and configure mongoose
            configure the .env file 
        }

        MIDDLEWARE = functions that run in between requests


    }
}