const jwt = require('jsonwebtoken');
const JWT_SECRET = "tinysecretkey";
const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');  // Get token from request header

    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET); // Verify token using secret
        req.user = data.user;  // Add user data to request
        next(); // Move to next middleware/route
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}
module.exports = fetchuser;