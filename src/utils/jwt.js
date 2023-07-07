const jwt = require('jsonwebtoken');

const {JWT_KEY} = process.env;

//if {JWT_KEY) does not exist-> throw error

const generateToken = (payload) => {
    return jwt.sign(payload, JWT_KEY, {expiresIn: '1d'});
}

const validateToken = (token) => {
    try {
        return jwt.verify(token, JWT_KEY);
    }catch (e) {
        return null;
    }
}
module.exports = {generateToken, validateToken};