const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

async function authToken(req, res, next) {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ error: "Unauthorized!" });
        }

        const token = authorization.split(" ")[1];


        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {

            if (err) {
                return res.status(403).json({ 
                    error: "Forbidden Invalid token!!",
                    auth: false
                });
            }
            
            req.user = decoded
            // console.log('decoded', decoded)

            next();
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
        })
    }
}

module.exports = {
    authToken,
}