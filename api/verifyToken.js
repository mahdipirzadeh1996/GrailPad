const jwt = require("jsonwebtoken");
const CryptoJs = require("crypto-js");

function verify(req, res, next) {
    const authHeader = req.headers.token;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(401).send('Wrong access token!');
            }
            next();
        });
    } else {
        res.status(401).send('Not authenticate!');
    }
}

module.exports = verify;