const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, "jwtsecretKey", (err, decoded) => {
        if (err) {
          if (err.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expired. Please log in again." });
          } else {
            return res.status(401).json({ error: "Invalid token." });
          }
        }
        req.user = decoded;
        next();
      });
};

module.exports = verifyToken;
