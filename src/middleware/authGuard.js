const {validateToken} = require('../utils/jwt');


module.exports = (req, res, next) => {
    const authorization = req.header('Authorization');
    //Bearer <token>
    if(!authorization) {
        res.status(401).json({error: 'missing authorization header'});
        return;
    }

    const [prefix, token] = authorization.split(' ');
    if (prefix !== 'Bearer' || !token) {
        res.status(401).json({error:'invalid authorization token format'});
        return;
    }

    try {
        req.user = validateToken(token);
        next();
    }catch(e) {
        res.status(401).json({error: 'invalid token'});
      //  return;
    }
};