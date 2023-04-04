import jwt from 'jsonwebtoken';
// middleware to verify if the token is valid

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization"); // saves the value of authorization header in token

        if (!token){
            return res.status(400).send("Access denied");
        }

        if (token.startsWith("Bearer ")){
            token = token.slice(7, tokens.length).trimLeft(); // to get the token after "bearer "
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); // passes control to next middleware function

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};