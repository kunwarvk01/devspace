// This function is a middleware that verifies if the incoming request has a valid access token
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    // Retrieve the access token from the request header
    let token = req.header("Authorization");

    // If the token is missing, return a 403 Forbidden response
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    // If the token starts with "Bearer ", remove it
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // Verify the token using the JWT_SECRET and attach the decoded user data to the request object
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
    
  } catch (err) {
    // If there's an error, send a 500 error response with the error message
    res.status(500).json({ error: err.message });
  }
};
